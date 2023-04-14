export const sleep = (sec: number = 1): Promise<boolean> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(true);
		}, sec * 1000);
	});
};
