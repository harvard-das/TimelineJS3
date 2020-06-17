const fs = require('fs')
const less = require('less')
const path = require('path')
const glob = require('glob')

/*
 * We let the main Timeline Less file get compiled by webpack
 * since we need it for the dev server, and it works
 * But it was too much trouble to make Webpack do all of these...
 */

/*
 * Compile font files 
 */
const font_src_dir = path.resolve(__dirname, '../src/less/fonts')
const font_output_dir = path.resolve(__dirname, '../dist/css/fonts')
fs.mkdirSync(font_output_dir, { recursive: true })
glob.sync(path.join(font_src_dir, "font.*.less")).forEach((p) => {
    let file_content = fs.readFileSync(p, 'utf-8')
    less.render(file_content, {
        filename: p
    }).then(
        (output) => {
            var basename = path.basename(p, '.less')
            var output_css = path.join(font_output_dir, `${basename}.css`)
            fs.writeFileSync(path.join(output_css), output.css)
            console.log(`FONT CSS compiled ${p}`)
        },
        (error) => {
            console.log(`fonts: error compiling ${p}`, error)
        }
    )
})

/*
 * Compile themes
 */
const theme_src_dir = path.resolve(__dirname, '../src/less/themes')
const theme_output_dir = path.resolve(__dirname, '../dist/css/themes')
fs.mkdirSync(theme_output_dir, { recursive: true })
glob.sync(path.join(theme_src_dir, "**/TL.Theme.*.less")).forEach((p) => {
    let file_content = fs.readFileSync(p, 'utf-8')
    less.render(file_content, {
        filename: p
    }).then(
        (output) => {
            var theme_name = p.split('/').slice(-2, -1)
            var output_css = path.join(theme_output_dir, `timeline.theme.${theme_name}.css`)
            fs.writeFileSync(output_css, output.css)
            console.log(`THEME CSS compiled ${p}`)
        },
        (error) => {
            console.log(`themes: error compiling ${p}`, error)
        }
    )
})