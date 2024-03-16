interface CheckVercelEnvReturn {
  vercelEnv: string | undefined;
  vercelCommitSha: string | undefined;
}

/**
 * Get Vercel environment variables
 * @returns CheckVercelEnvReturn
 */
export const getVercelEnv = (): CheckVercelEnvReturn => {
  const vercelEnv = process.env.NEXT_PUBLIC_VERCEL_ENV;
  const vercelCommitSha = process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA;
  return {
    vercelEnv,
    vercelCommitSha,
  };
};

/**
 * Check if the current environment is Vercel production
 * @returns boolean
 */
export const isVercelEnvProduction = (): boolean => {
  return process.env.NEXT_PUBLIC_VERCEL_ENV === 'production';
};
