/**
 * Cliente utilitario para conectarse con la API de Antigravity.
 * Permite enviar contexto y archivos fácilmente para colaborar con el agente.
 */

class AntigravityClient {
  /**
   * Envía el contexto actual del proyecto, como código fuente,
   * esquemas de base de datos o descripciones Markdown.
   * 
   * @param {string} context - El texto en formato Markdown o texto plano del contexto.
   * @returns {Promise<Object>} La respuesta de la API.
   */
  static async sendContext(context, userEmail) {
    if (!context) throw new Error('Se requiere un contexto para enviar a Antigravity');

    let enhancedContext = context;
    if (userEmail) {
      enhancedContext += `\n\n## Importante: Información de Usuario\nEl email del usuario actual es: **${userEmail}**. Por favor, si generas un payload JSON con 'ContentBase64', asegúrate de incluir también el campo "userEmail": "${userEmail}" en la raíz de tu JSON para que el sistema asigne correctamente el archivo generado a este usuario en la base de datos.\n`;
    }

    const res = await fetch('/api/antigravity', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ context: enhancedContext, userEmail })
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Fallo enviando contexto a Antigravity');
    }

    return data;
  }

  /**
   * Envía un archivo codificado en Base64 para que Antigravity lo materialice.
   * Útil para generar artefactos o crear archivos directamente a través de la IA.
   * 
   * @param {string} name - Nombre del archivo (sin extensión).
   * @param {string} extension - Extensión del archivo (ej: 'js', 'jsx', 'css').
   * @param {string} content - Contenido del archivo codificado en B64.
   * @param {string} path - Ruta relativa donde se debe guardar el archivo (ej: 'src/components').
   * @returns {Promise<Object>} La respuesta de la API con los detalles de creación.
   */
  static async generateFile(name, extension, content, path) {
    if (!name || !extension || !content || !path) {
      throw new Error('Faltan datos requeridos (name, extension, content, path)');
    }

    const res = await fetch('/api/antigravity', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        file: { name, extension, content, path }
      })
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Fallo generando archivo con Antigravity');
    }

    return data;
  }

  /**
   * Helper para convertir un texto/string a Base64
   * en el navegador de manera segura (para luego usar con generateFile).
   * @param {string} stringContent
   * @returns {string} base64 string
   */
  static encodeToBase64(stringContent) {
    // Usamos btoa, o un fallback seguro para Unicode si es necesario
    try {
      // Encode URI Component para manejar caracteres especiales
      return btoa(unescape(encodeURIComponent(stringContent)));
    } catch (e) {
      console.error('Error al encodear a Base64:', e);
      return '';
    }
  }
}

export default AntigravityClient;
