import {
    OutputType,
    BlockShape,
    InputShape,
} from "$lib/utils/blockRegistryTool";

class BaseBlocks {
    getRegistry() {
        return {
            id: "base",
            color: "#3844fc",
            blocks: [
                {
                    func: "token",
                    text: "Connect to bot using [TOKEN]",
                    blockShape: BlockShape.FLOATING,
                    arguments: [
                        {                    
                            type: InputShape.VALUE,
                            check: OutputType.STRING,
                        },
                    ],
                }
            ]
        };
    }

    // login to discord and if token invalid let them know
    token(args: any) {
        return `client.login(${args.TOKEN}).catch((err) => {
            console.error(err);
            return "Invalid token";
        });`;
    }
}

export default BaseBlocks;
