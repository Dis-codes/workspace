import { BlockShape, InputShape, OutputType } from "$lib/utils/constants";

class TimeBlocks {
	getRegistry() {
		return {
			id: "time",
			color: "#a4a464",
			blocks: [
				{
					func: "wait",
					text: "wait [TIME] [UNIT]",
					shape: BlockShape.STATEMENT,
					inline: true,
					arguments: {
						TIME: {
							type: InputShape.VALUE,
							check: OutputType.NUMBER
						},
						UNIT: {
							type: InputShape.MENU,
							options: [
								["milliseconds", "milliseconds"],
								["seconds", "seconds"],
								["minutes", "minutes"],
								["hours", "hours"],
								["days", "days"]
							]
						}
					}
				},
				{
					func: "current",
					text: "current [UNIT]",
					output: OutputType.NUMBER,
					inline: true,
					arguments: {
						UNIT: {
							type: InputShape.MENU,
							options: [
								["millisecond", "getMilliseconds"],
								["second", "getSeconds"],
								["minute", "getMinutes"],
								["hour", "getHours"],
								["day", "getDay"],
								["month", "getMonth"],
								["year", "getFullYear"],
								["date", "getDate"],
								["UNIX", "UNIX"],
								["UNIX (ms)", "getTime"]
							]
						}
					}
				},
				{
					func: "format",
					text: "format [DATE] as [LOCALE] [FORMAT]",
					inline: true,
					output: OutputType.STRING,
					arguments: {
						DATE: {
							type: InputShape.VALUE,
							check: OutputType.STRING
						},
						LOCALE: {
							type: InputShape.MENU,
							options: [
								["en-US", "en-US"],
								["fr-FR", "fr-FR"],
								["de-DE", "de-DE"],
								["es-ES", "es-ES"],
								["it-IT", "it-IT"],
								["nl-NL", "nl-NL"],
								["pl-PL", "pl-PL"],
								["pt-BR", "pt-BR"],
								["ru-RU", "ru-RU"],
								["ja-JP", "ja-JP"],
								["zh-CN", "zh-CN"],
								["zh-TW", "zh-TW"],
								["ko-KR", "ko-KR"],
								["tr-TR", "tr-TR"]
							]
						},
						FORMAT: {
							type: InputShape.MENU,
							options: [
								["Thursday, December 20, 2012", "full"],
								["December 20, 2012", "long"],
								["Dec 20, 2012", "medium"],
								["12/20/2012", "short"],
								["Thursday, December 20, 2012 12:00 PM", "fullDateTime"]
							]
						}
					}
				},
				{
					func: "get_date",
					text: "get [UNIT] from [DATE]",
					inline: true,
					output: OutputType.NUMBER,
					arguments: {
						UNIT: {
							type: InputShape.MENU,
							options: [
								["millisecond", "getMilliseconds"],
								["second", "getSeconds"],
								["minute", "getMinutes"],
								["hour", "getHours"],
								["day", "getDay"],
								["month", "getMonth"],
								["year", "getFullYear"],
								["date", "getDate"],
								["UNIX", "UNIX"],
								["UNIX (ms)", "getTime"]
							]
						},
						DATE: {
							type: InputShape.VALUE,
							check: OutputType.STRING
						}
					}
				},
				{
					func: "locale_time",
					text: "change UNIX [UNIX] to [LOCALE] [FORMAT]",
					inline: true,
					output: OutputType.STRING,
					arguments: {
						UNIX: {
							type: InputShape.VALUE,
							check: OutputType.STRING
						},
						LOCALE: {
							type: InputShape.MENU,
							options: [
								["en-US", "en-US"],
								["fr-FR", "fr-FR"],
								["de-DE", "de-DE"],
								["es-ES", "es-ES"],
								["it-IT", "it-IT"],
								["nl-NL", "nl-NL"],
								["pl-PL", "pl-PL"],
								["pt-BR", "pt-BR"],
								["ru-RU", "ru-RU"],
								["ja-JP", "ja-JP"],
								["zh-CN", "zh-CN"],
								["zh-TW", "zh-TW"],
								["ko-KR", "ko-KR"],
								["tr-TR", "tr-TR"]
							]
						},
						FORMAT: {
							type: InputShape.MENU,
							options: [
								["Thursday, December 20, 2012", "full"],
								["December 20, 2012", "long"],
								["Dec 20, 2012", "medium"],
								["12/20/2012", "short"],
								["Thursday, December 20, 2012 12:00 PM", "fullDateTime"]
							]
						}
					}
				},
				{
					func: "discord_time",
					text: "change UNIX [UNIX] to discord format [FORMAT]",
					inline: true,
					output: OutputType.STRING,
					arguments: {
						UNIX: {
							type: InputShape.VALUE,
							check: OutputType.STRING
						},
						FORMAT: {
							type: InputShape.MENU,
							options: [
								["29/09/2023", "full"],
								["29 September 2023", "long"],
								["17:12", "medium"],
								["17:12:00", "short"],
								["29 September 2023 17:12", "fullDateTime"],
								["Friday, 29 September 2023 17:12", "fullDate"],
								["25 minutes ago", "relativeTime"]
							]
						}
					}
				}
			]
		};
	}

	wait(args: any) {
		switch (args.UNIT) {
			case "milliseconds":
				return `await delay(${args.TIME})`;
			case "seconds":
				return `await delay(${args.TIME} * 1000)`;
			case "minutes":
				return `await delay(${args.TIME} * 1000 * 60)`;
			case "hours":
				return `await delay(${args.TIME} * 1000 * 60 * 60)`;
			case "days":
				return `await delay(${args.TIME} * 1000 * 60 * 60 * 24)`;
		}
	}

	current(args: any) {
		if (args.UNIT == "UNIX") {
			return "Math.floor(new Date().getTime() / 1000)";
		}
		return `new Date().${args.UNIT}`;
	}

	format(args: any) {
		return `new Date(${args.DATE}).toLocaleDateString("${args.LOCALE}", { ${args.FORMAT} })`;
	}

	get_date(args: any) {
		if (args.UNIT == "UNIX") {
			return `Math.floor(new Date(${args.DATE}).getTime() / 1000)`;
		}
		return `new Date(${args.DATE}).${args.UNIT}`;
	}

	locale_time(args: any) {
		return `new Date(${args.UNIX} * 1000).toLocaleDateString("${args.LOCALE}", { ${args.FORMAT} })`;
	}

	discord_time(args: any) {
		switch (args.FORMAT) {
			case "full":
				return `<t:${args.UNIX}:d>`;
			case "long":
				return `<t:${args.UNIX}:D>`;
			case "medium":
				return `<t:${args.UNIX}:t>`;
			case "short":
				return `<t:${args.UNIX}:T>`;
			case "fullDateTime":
				return `<t:${args.UNIX}:f>`;
			case "fullDate":
				return `<t:${args.UNIX}:F>`;
			case "relativeTime":
				return `<t:${args.UNIX}:R>`;
		}
	}
}

export default TimeBlocks;
