export const base64ToBlob = async (imgURL: any) => {
    return await fetch(imgURL).then(res => res.blob());
}

