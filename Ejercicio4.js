// Importo las herramientas necesarias para comunicarme con la base de datos
import { getPosts, getComments, deleteComment, deletePost } from "./Peticiones/Modules/Modulo4.js";

/**
 * Mi función principal: me encargo de limpiar todos los posts y sus comentarios.
 */
const eliminarComentariosYPosts = async () => {
    try {
        // Primero, solicito todos los posts disponibles
        const posts = await getPosts();

        // Si noto que no hay nada que borrar, aviso y me detengo
        if (posts.length === 0) {
            console.log("No hay posts para procesar.");
            return;
        }

        // Empiezo a recorrer cada post uno por uno
        for (const post of posts) {
            console.log(`Procesando Post ID: ${post.id} - ${post.title}`);

            // Busco si este post específico tiene comentarios asociados
            const comments = await getComments(post.id);

            // Si encuentro comentarios, los borro individualmente antes de seguir
            if (comments.length > 0) {
                console.log(`  Encontrados ${comments.length} comentarios. Eliminando...`);
                for (const comment of comments) {
                    await deleteComment(comment.id);
                    console.log(`- Comentario eliminado: ${comment.id}`);
                }
            } else {
                console.log("  No tiene comentarios.");
            }

            // Una vez que el post está "limpio", procedo a eliminarlo a él también
            await deletePost(post.id);
            console.log(`  Post eliminado: ${post.id}`);
        }

        console.log("Proceso completado.");
    } catch (error) {
        // Si algo sale mal en el camino, informo sobre el error
        console.error("Error en el proceso:", error);
    }
}

// Aquí es donde inicio todo mi flujo de trabajo
eliminarComentariosYPosts();