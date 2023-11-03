class Common {


    capitalize(text) {
        if (text) {
            let a = text.split("")
            a[0] = a[0].toUpperCase()
            return a.join("")
        }
        else {
            return text
        }
    }

}

export default Common