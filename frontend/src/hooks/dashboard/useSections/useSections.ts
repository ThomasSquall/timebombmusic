import { useMemo } from "react";
import { getAdminSections, getSections, Section } from "./sections";
import { useUser } from "../../user";

export const useSections = (): Section[] => {
  const user = useUser();

  return useMemo(() => {
    let result: Section[] = [];

    if (user?.is_admin) {
      result = [
        ...result,
        ...getAdminSections(),
      ];
    } else {
      result = [
        ...result,
        ...getSections(),
      ];
    }

    return result;
  }, [user]);
};
