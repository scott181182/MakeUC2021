


export function parseAnnotationText(text: string)
{
    const [ header, ...lines ] = text.split(/[\r\n]+/);
    const keys = header.split("\t").map((k) => k.trim());

    const tsIndex = keys.indexOf("Begin Time - msec");
    const rcIndex = keys.indexOf("Recording");
    const pgIndex = keys.indexOf("Page");

    return lines
        .filter((line) => line)
        .map((line) => line.split("\t"))
        .map((fields) => ({
            timestamp: parseInt(fields[tsIndex]),
            label: fields[rcIndex],
            page: parseInt(fields[pgIndex])
        }));
}
