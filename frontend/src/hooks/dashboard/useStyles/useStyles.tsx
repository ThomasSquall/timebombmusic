type UseStylesProps = {
    depth: number;
}

export const useStyles = ({ depth }: UseStylesProps) => {
    let paddingLeft = 24;

    if (depth > 0) {
        paddingLeft = 32 + 8 * depth;
    }

    return {
        paddingLeft,
        paddingRight: 3,
        textAlign: "left",
        justifyContent: "flex-start"
    }
}