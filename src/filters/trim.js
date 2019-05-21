export default function (value) {
    return value.replace(/^(.{100}[^\s]*).*/, "$1") + ' ...'
}