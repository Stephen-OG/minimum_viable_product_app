export interface BaseUser {
    username: string | null;
    email: string | null;
    created_at: Date;
    updated_at: Date;
  };

  export interface User extends BaseUser {
    id: string;
  };

