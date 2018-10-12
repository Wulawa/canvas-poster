export default {
	xhr(url) {
		const xhr = window.XMLHttpRequest;
		return new Promise((resolve, reject) => {
			if (xhr) {
				try {
					const xmlhttp = new xhr();
					xmlhttp.open('GET', url, true);
					xmlhttp.responseType = 'blob';
					xmlhttp.withCredentials = false;
					xmlhttp.onload = () => {
						if (xmlhttp.status == 200) {
							resolve(xmlhttp.response);
						} else {
							reject(xmlhttp);
						}
					};
					xmlhttp.send(null);
				} catch (e) {
					console.error(e);
					reject(e);
				}
			} else {
				reject('no xhr');
			}
		});
	},
	blobtoImg(blob) {
		const img = new Image();
		return new Promise((resolve, reject) => {
			img.src = window.URL.createObjectURL(blob);
			img.onload = () => {
				resolve(img);
			};
			img.onerror = e => {
				reject(e);
			};
		});
	},
	async loader(urls, img) {
		const imgs = await Promise.all(
			urls.map(item => {
				return this.xhr(item);
			})
		);
		if (img) {
			return await Promise.all(
				imgs.map(item => {
					return this.blobtoImg(item);
				})
			);
		}
		return imgs;
	}
};
