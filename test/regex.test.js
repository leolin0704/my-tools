describe('regex', function(){
    test('can match html tag start', () => {
        const html = '<div>this is a div<b>this is a b</b></div>'

        const regex = /<div>/
        const result = html.match(regex)
        expect(result[0]).toBe('<div>')
    });

    test('can exec html tag close', () => {
        const html = `<div
        class='name'>
            this is a div
            <b>this is a b</b>
        </div>
        <div
        class='name'>
            this is another div
            <b>this is a b</b>
        </div>
        <span>this is a text</span>
        some text outside tag`

        const regex = new RegExp(/<(\w+)([^>]*)>[\w\W]*?<\/\1>/, 'g')
        const result =  html.match(regex)

        expect(result[0]).toBe(`<div
        class='name'>
            this is a div
            <b>this is a b</b>
        </div>`)
        expect(result[1]).toBe(`<div
        class='name'>
            this is another div
            <b>this is a b</b>
        </div>`)
    });
})