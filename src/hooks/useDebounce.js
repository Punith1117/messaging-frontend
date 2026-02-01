import { useEffect, useState } from "react"

const useDebounce = (text) => {
    const [debouncedText, setDebouncedText] = useState(text);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedText(text)
        }, 500)

        return () => clearTimeout(timer)
    }, [text])

    return debouncedText
}

export default useDebounce