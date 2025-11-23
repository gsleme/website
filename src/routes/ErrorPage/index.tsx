function ErrorPage() {
    return (
        <main>
            <section className="bg-cc-cinza h-[100vh] w-[100vw] fixed top-0 right-0">
                <div className="flex flex-col items-center min-w-[300px] w-[80vw] max-w-[1400px] min-h-[80vh] my-[2vh] bg-white rounded-lg mx-auto mt-[14vh] px-4">
                    <h1>"Página não existe" </h1>
                    <p>Que pena! Nenhuma página com esse endereço... Confira se escreveu corretamente.</p>
                </div>

            </section>
        </main>
    )
}

export default ErrorPage