class App {
    constructor(page) {
        if(page === 'INDEX') {
            return this.startIndexPage()
        }
    }
    startIndexPage() {
        console.log('hello')
    }
}

export default App
