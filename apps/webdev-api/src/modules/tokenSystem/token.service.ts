import {
  tokenModel as defaultTokenModel,
  TokenModel,
} from "@/modules/tokenSystem/token.model.js"; 
import { generateCouponCode } from "./token.utils.js";
import { Schemas, Types } from "@packages/api-types";
import {
  templateService as defaultTokenTemplateService,
  TemplateService,
} from "./template.service.js";
import {
  walletService as defaultWalletService,
  WalletService,
} from "../pointSystem/wallet.service.js";

export class TokenService {
  constructor(
    private tokenModel: TokenModel = defaultTokenModel,
    private tokenTemplateService: TemplateService = defaultTokenTemplateService,
    private walletService: WalletService = defaultWalletService
  ) {}

  listTokensByPage = async (pageNumber: number, pageSize: number) => {
    const { data: listData, error: listError } =
      await this.tokenModel.listTokensByPage(pageNumber, pageSize);
    if (listError) {
      return { error: listError };
    }

    const { data: count, error: countError } =
      await this.tokenModel.countTokens();
    if (countError) {
      return { error: countError };
    }

    return {
      data: {
        listData: listData || [],
        count: count || 0,
      },
    };
  };

  createToken = async (
    body: Types["tokenSystem"]["templates"]["tokens"]["post"]["request"]["body"],
    creator_id: string
  ) => {
    // business logic

    let code = generateCouponCode();

    // check if code already exists before proceeding
    // if it exists, generate a new one
    // repeat until a unique code is found
    // after 5 attempts, increment code length and try again
    // after 10 attempts, return error
    let attempts = 0;
    let codeLength = 6;
    while (attempts < 10) {
      const { data: codeExists, error: codeExistsError } =
        await this.tokenModel.tokenWithCodeExists(code);

      if (codeExistsError) {
        return { error: codeExistsError };
      }

      if (!codeExists) {
        break;
      }
      code = generateCouponCode(codeLength);
      attempts++;
      if (attempts === 5) {
        codeLength++;
        attempts = 0;
      }
    }
    if (attempts === 10) {
      return { error: "Could not generate unique code after 10 attempts" };
    }

    const { data, error } = await this.tokenModel.createToken({
      ...body,
      creator_id,
      code: code,
    });

    if (error) {
      return { error };
    }

    // returning data
    return { data };
  };

  getToken = async (id: string) => {
    const { data, error } = await this.tokenModel.getTokenById(id);

    if (error) {
      return { error };
    }

    return { data };
  };

  claimToken = async (token_id: string, user_id: string) => {
    // get data of token to be claimed
    const { data: token, error: tokenError } =
      await this.tokenModel.getTokenById(token_id);
    if (tokenError)
      return { error: `token fetch error: ${JSON.stringify(tokenError)}` };
    if (!token) return { error: "Token not found" };

    // get the token template
    const { data: tokenTemplate, error: tokenTemplateError } =
      await this.tokenTemplateService.get({ id: token.template_id });
    if (tokenTemplateError) {
      return { error: `token template fetch error: ${tokenTemplateError}` };
    }
    if (!tokenTemplate) {
      return { error: "Token template not found" };
    }

    // get value of token from token template
    const tokenValue = tokenTemplate.value;

    // todo:
    // check if token is valid for claiming (e.g., not expired, not already claimed)

    // mark token as claimed
    const { data: markTokenAsClaimedData, error: markTokenAsClaimedDataError } =
      await this.tokenModel.markTokenAsClaimed(token_id, user_id);
    if (markTokenAsClaimedDataError) {
      return {
        error: `mark token as claimed error: ${JSON.stringify(markTokenAsClaimedDataError)}`,
      };
    }

    // debit user's wallet
    const { data: walletData, error: walletError } =
      await this.walletService.incrementPoints(user_id, tokenValue);
    if (walletError) {
      return { error: `wallet increment error: ${walletError}` };
    }

    // return data
    return { data: markTokenAsClaimedData };
  };

  claimTokenByCode = async (code: string, user_id: string) => {
    // get token data by code
    const { data: tokenData, error: tokenError } =
      await this.tokenModel.getTokenByCode(code);
    if (tokenError) {
      return {
        error: `token fetch error: ${JSON.stringify(tokenError)}`,
      };
    }
    if (!tokenData) {
      return { error: "Token not found" };
    }

    // get token id
    const token_id = tokenData.id;

    // claim the token
    const { data: claimData, error: claimError } = await this.claimToken(
      token_id,
      user_id
    );
    if (claimError) {
      return { error: claimError };
    }

    // return data
    return { data: claimData };
  };
}

export const tokenService = new TokenService();
