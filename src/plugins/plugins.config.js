import {useAnotherPlugins} from "@/plugins/another";
import {useSpringDash} from "@/plugins/springdash";
import {useAnt} from "@/plugins/ant-design";

export const usePlugins = async(app) => {
    await useAnt(app);
    useAnotherPlugins(app);
    useSpringDash(app);
}