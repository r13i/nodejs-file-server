const { parse } = require('url');
const { resolve, join, sep } = require('path');

const baseDirectory = process.cwd();

exports.urlPath = (url) => {
    let { pathname } = parse(url);
    let path = resolve(decodeURIComponent(pathname).slice(1));

    if (path != baseDirectory && !path.startsWith(baseDirectory + sep))
        throw { status: 403, body: 'Forbidden'};

    return path;
}

exports.pipeStream = (from, to) => {
    return new Promise ((resolve, reject) => {
        from.on('error', reject);
        to.on('error', reject);
        to.on('finish', resolve);
        from.pipe(to);
    });
}

exports.getListItem = (request, file) => {
    return `<li><a href="${join(parse(request.url).pathname, file)}">${file}</a></li>`;
}