"use strict";

const { createReadStream, createWriteStream } = require('fs');
const { readdir, stat, rmdir, unlink } = require('fs').promises;
const mime = require('mime');

const { urlPath, pipeStream, getListItem } = require('./helper');

const methods = Object.create(null);

methods.GET = async function (request) {
    let path = urlPath(request.url);
    let stats;
    try {
        stats = await stat(path);
    } catch (error) {
        if (error.code != 'ENOENT') throw error;
        else return { status: 404, body: "File not found" };
    }

    if (stats.isDirectory()) {
        let files = ['.', '..'];
        files = files.concat(await readdir(path));

        return {
            body: files
                .map(file => getListItem(request, file))
                .join('\n'),
            type: "text/html"
        };
    }
    else
        return { body: createReadStream(path), type: mime.getType(path) };
}

methods.DELETE = async function (request) {
    let path = urlPath(request.url);
    let stats;
    try {
        stats = await stat(path);
    } catch (error) {
        if (error.code != 'ENOENT') throw error;
        else return { status: 204 };
    }

    if (stats.isDirectory()) await rmdir(path);
    else await unlink(path);

    return { status: 204 };
}

methods.PUT = async function (request) {
    let path = urlPath(request.url);
    await pipeStream(request, createWriteStream(path));
    return { status: 204 };
}

exports.methods = methods;