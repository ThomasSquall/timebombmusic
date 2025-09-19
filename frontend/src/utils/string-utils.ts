export const ucfirst = (str: string): string => {
    function capitalizeFirstLetter(_str: string) {
        return _str.charAt(0).toUpperCase() + _str.slice(1);
    }

    let result = "";

    for (const s of str.split(" ")) {
        result += capitalizeFirstLetter(s) + " ";
    }

    return result.trim();
}
