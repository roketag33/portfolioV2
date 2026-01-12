export const TEXT_SAMPLES = [
    {
        id: 'js-promise',
        text: "const promise = new Promise((resolve, reject) => { setTimeout(() => resolve('done'), 1000); });",
        language: 'javascript',
        author: 'MDN'
    },
    {
        id: 'py-list-comp',
        text: "squares = [x**2 for x in range(10) if x % 2 == 0]",
        language: 'python',
        author: 'Python Docs'
    },
    {
        id: 'rust-hello',
        text: "fn main() { println!(\"Hello, world!\"); }",
        language: 'rust',
        author: 'Rust Book'
    },
    {
        id: 'quote-linus',
        text: "Talk is cheap. Show me the code.",
        language: 'text',
        author: 'Linus Torvalds'
    },
    {
        id: 'quote-knuth',
        text: "Premature optimization is the root of all evil.",
        language: 'text',
        author: 'Donald Knuth'
    },
    {
        id: 'quote-jobs',
        text: "Stay hungry, stay foolish.",
        language: 'text',
        author: 'Steve Jobs'
    },
    {
        id: 'react-hook',
        text: "useEffect(() => { document.title = `You clicked ${count} times`; }, [count]);",
        language: 'javascript',
        author: 'React Docs'
    },
    {
        id: 'css-flex',
        text: ".container { display: flex; justify-content: center; align-items: center; }",
        language: 'css',
        author: 'CSS Tricks'
    }
]

export const getRandomText = () => {
    return TEXT_SAMPLES[Math.floor(Math.random() * TEXT_SAMPLES.length)]
}
