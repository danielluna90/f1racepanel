declare module 'astro:env/client' {
	
}

declare module 'astro:env/server' {
	export const API_URL: string;	


	export const getSecret: (key: string) => string | undefined;
}
