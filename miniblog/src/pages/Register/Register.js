import styles from "./Register.module.css";

const Register = () => {
  return (
    <div> <h1>Cadastra-se para postar</h1>
        <p>Crie seu usuário e compartilhe suas histórias</p>
        <form>
            <label>
                <span>Nome:</span>
                <input type="text" name="displayName" required placeholder="Nome do usuario" />
            </label>
             <label>
                <span>Email:</span>
                <input type="email" name="email" required placeholder="Email do usuario" />
            </label>
             <label>
                <span>Senha:</span>
                <input type="password" name="password" required placeholder="insira sua senha" />
            </label>
            <label>
                <span>Confirmação de senha:</span>
                <input type="password" name="confirmaPassword" required placeholder="confirme sua senha" />
            </label>
            <button className="btn">Cadastrar</button>
        </form></div>
  )
}

export default Register