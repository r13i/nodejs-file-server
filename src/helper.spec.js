const { urlPath, pipeStream, getListItem } = require('./helper');

describe("urlPath", () => {
    const baseDirectory = process.cwd();
    const exampleUrl = "https://www.example.com";
    const targetPath = "/some/path/to/file.txt";

    // it("Should throw an error object with status 403 for urls with paths above root", () => {
    //     expect(urlPath(exampleUrl + "/../..")).toThrow({
    //         "body": "Forbidden",
    //         "status": 403,
    //     });
    // });

    it("Should return path absolute starting from current working dir", () => {
        expect(urlPath(exampleUrl + targetPath)).toBe(baseDirectory + targetPath);
    });
});

// describe("pipeStream", () => {});

describe("getListItem", () => {
    const request = {
        url: "http://www.example.com",
    };
    const file = "some/file/path.txt";

    it("Should return a DOM list item with an achor href", () => {
        expect(getListItem(request, file)).toBe(
            "<li><a href=\"/some/file/path.txt\">some/file/path.txt</a></li>"
        );
    });
});