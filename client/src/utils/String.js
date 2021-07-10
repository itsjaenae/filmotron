export const toTitleCase = (str) => {
    return str
        .toLowerCase()
        .split(' ')
        .map((s) => {
            //capitalize first letter of words adjacent to dashes
            const words = s
                .split('-')
                .map((w) => w.charAt(0).toUpperCase() + w.substring(1))
                .join('-');
            return words;
        })
        .join(' ');
};
