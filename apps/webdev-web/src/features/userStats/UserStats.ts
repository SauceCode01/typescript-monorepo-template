export type Wallet = {
  id: string; // wallet id
  uid: string; // uid of the user who owns the wallet
  points: number; // number of points in the wallet
  history: // journal of wallet changes
  {
    change: number; // amount of points added or deducted from wallet
    date: number; // new Date.now()
    message: string; // description of the change
  }[];
};

// Smaller version of wallet object
export type WalletDuplicate = Omit<Wallet, "history">;

// list of all wallets
export type WalletList = Record<string, WalletDuplicate>;

export type Streak = {
  id: string;
  uid: string;
  currentStreak: number;
  longestStreak: number;
  history: {
    questionYear: number;
    questionMonth: number;
    questionDay: number;
    points: number;
    date: number;
  }[];
};

export type StreakDuplicate = Omit<Streak, "history" >;

export type StreakList = Record<string, StreakDuplicate>;


export type UserStats = {
  id: string;
  uid: string;
  wallet: Wallet; 
  streak: Streak
}

export type UserStatsDuplicate = {
  id: string;
  uid: string;
  wallet: WalletDuplicate; 
  streak: StreakDuplicate
}

export type UserStatsList = Record<string, UserStatsDuplicate>;