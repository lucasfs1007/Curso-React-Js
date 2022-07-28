import styles from "./CreatePost.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext"; 
import { useInsertDocument } from "../../hooks/useInsertDocument";

const CreatePost = () => {

  const[title,setTitle] = useState("");
  const[image,setImage] = useState("");
  const[body,setBody] = useState("");
  const[tags,setTags] = useState([]);
  const[formError,setFormError] = useState("");
  const{insertDocument,response} = useInsertDocument("posts");
  const navigate = useNavigate()
  const {user} = useAuthValue();

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");

    try {
      new URL(image)
    } catch (error) {
      setFormError("A imagem precisa ser uma URL");
      
    }

    const tagsArray = tags.split(",").map((tag) =>tag.trim().toLowercase());

    if (!title || !image || !tags || !body) {
      setFormError("Por favor, preencha todos os campos.");
    }

    
    if(formError) {
      return;
    }

    insertDocument({
      title,
      uid:user.uid,
      image,
      body,
      tagsArray,
     createdBy:user.displayName,
    });
    navigate("/");
  };

  return (
    <div className={styles.create_post}>
      <h2>Criar post</h2>
      <p>Escreva sobre o que quiser e compartilhe com a comunidade</p>
      <form onSubmit={handleSubmit}>
        <label >
            <span>Título:</span>
            <input type="text" name="title" required placeholder="Digite seu título para o post" onChange={(e) => setTitle(e.target.value)} value={title} />
        </label>
          <label >
            <span>URL da imagem:</span>
            <input type="text" name="image" required placeholder="Insira uma imagem para seu post" onChange={(e) => setImage(e.target.value)} value={image} />
        </label>
          <label >
            <span>Conteúdo:</span>
           <textarea name="body" required placeholder="Insira o conteúdo do post" onChange={(e) => setBody(e.target.value)} value={body} ></textarea>
        </label>
          <label >
            <span>Tags:</span>
            <input type="text" name="tags" required placeholder="Insira as tags separadas por virgulas" onChange={(e) => setTags(e.target.value)} value={tags} />
        </label>
  
        {!response.loading && <button className="btn">Cadastrar</button>}
            {response.loading &&(
                <button className="btn" disabled>
                    aguarde...
                </button>
            )}
            {response.error && <p className="error">{response.error}</p>} 
             {formError && <p className="error">{formError}</p>} 
      </form>
    </div>
  );
};

export default CreatePost