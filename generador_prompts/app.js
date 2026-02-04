// app.js
const state = {
  examplesCount: 0
};

function el(id){return document.getElementById(id)}

// ============================================
// SISTEMA DE TOOLTIPS INTERACTIVOS
// ============================================
function setupTooltips() {
  const helpIcons = document.querySelectorAll('.help-icon');
  
  helpIcons.forEach(icon => {
    const tooltipId = icon.getAttribute('data-tooltip');
    const tooltip = document.getElementById(tooltipId);
    
    if (!tooltip) return;
    
    // Mostrar tooltip al hacer hover
    icon.addEventListener('mouseenter', () => {
      // Ocultar todos los demás tooltips
      document.querySelectorAll('.tooltip').forEach(t => t.classList.remove('show'));
      tooltip.classList.add('show');
    });
    
    // Ocultar al salir del área (icon + tooltip)
    icon.addEventListener('mouseleave', (e) => {
      setTimeout(() => {
        if (!tooltip.matches(':hover') && !icon.matches(':hover')) {
          tooltip.classList.remove('show');
        }
      }, 100);
    });
    
    // Mantener visible si el mouse está sobre el tooltip
    tooltip.addEventListener('mouseenter', () => {
      tooltip.classList.add('show');
    });
    
    tooltip.addEventListener('mouseleave', () => {
      tooltip.classList.remove('show');
    });
    
    // Click para mostrar/ocultar en dispositivos táctiles
    icon.addEventListener('click', (e) => {
      e.stopPropagation();
      const isVisible = tooltip.classList.contains('show');
      // Ocultar todos
      document.querySelectorAll('.tooltip').forEach(t => t.classList.remove('show'));
      // Toggle el actual
      if (!isVisible) {
        tooltip.classList.add('show');
      }
    });
  });
  
  // Cerrar tooltips al hacer click fuera
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.help-icon') && !e.target.closest('.tooltip')) {
      document.querySelectorAll('.tooltip').forEach(t => t.classList.remove('show'));
    }
  });
}

// ============================================
// SUGERENCIAS DE FORMATO INTERACTIVAS
// ============================================
function setupFormatSuggestions() {
  const suggestions = document.querySelectorAll('.suggestion-item');
  const formatSelect = el('format');
  const titleInput = el('title');
  const methodologiesInput = el('methodologies');
  const extrasInput = el('extras');
  
  const formatTemplates = {
    'gamification': {
      format: 'Juego breve (puntos, niveles)',
      title: 'Misión Matemática: Conquista los Números',
      methodologies: 'gamificación, aprendizaje basado en juegos, recompensas progresivas',
      extras: 'sistema de puntos, badges de logros, ranking, efectos visuales al ganar, barra de progreso, niveles desbloqueables'
    },
    'sandbox': {
      format: 'Simulación / Laboratorio virtual',
      title: 'Laboratorio Químico Virtual',
      methodologies: 'aprendizaje por descubrimiento, experimentación libre, constructivismo',
      extras: 'entorno de experimentación seguro, múltiples elementos combinables, feedback en tiempo real, posibilidad de deshacer acciones'
    },
    'decision-tree': {
      format: 'Árbol de decisiones / Escenario ramificado',
      title: 'El Dilema Ecológico: Salva el Bosque',
      methodologies: 'aprendizaje basado en problemas, pensamiento crítico, toma de decisiones',
      extras: 'narrativa inmersiva, múltiples finales, consecuencias visibles, gráfico del árbol de decisiones, rejugabilidad'
    },
    'simulation': {
      format: 'Simulación / Laboratorio virtual',
      title: 'Simulador del Sistema Solar',
      methodologies: 'aprendizaje experiencial, visualización científica, modelo interactivo',
      extras: 'física realista, controles de velocidad/tiempo, zoom interactivo, información contextual, animaciones suaves'
    },
    'quiz': {
      format: 'Cuestionario interactivo',
      title: 'Quiz Maestro: Desafío de Historia',
      methodologies: 'evaluación formativa, feedback inmediato, aprendizaje adaptativo',
      extras: 'retroalimentación explicativa, pistas opcionales, temporizador, puntuación dinámica, animaciones de correcto/incorrecto'
    },
    'storytelling': {
      format: 'Narrativa interactiva (storytelling)',
      title: 'La Gran Aventura de la Célula',
      methodologies: 'storytelling educativo, aprendizaje narrativo, gamificación ligera',
      extras: 'narrativa envolvente, personajes carismáticos, capítulos secuenciales, ilustraciones atractivas, diálogos interactivos'
    },
    'drag-drop': {
      format: 'Juego de arrastrar y soltar',
      title: 'Organiza el Ecosistema',
      methodologies: 'aprendizaje kinestésico, clasificación visual, feedback inmediato',
      extras: 'arrastre suave, zonas de drop destacadas, animación de acierto/error, sonido opcional, contador de intentos'
    },
    'timeline': {
      format: 'Línea de tiempo interactiva',
      title: 'Viaje por la Historia Mundial',
      methodologies: 'aprendizaje cronológico, contextualización histórica, narrativa visual',
      extras: 'navegación horizontal/vertical, zoom en eventos, imágenes contextuales, filtros por tema, tarjetas informativas'
    },
    'map': {
      format: 'Mapa conceptual interactivo',
      title: 'Red de Conceptos: Ecosistemas',
      methodologies: 'organización conceptual, aprendizaje visual, conexiones cognitivas',
      extras: 'nodos expandibles, conexiones animadas, colores por categoría, búsqueda de conceptos, modo edición opcional'
    },
    'code-editor': {
      format: 'Actividad interactiva web (HTML/CSS/JS)',
      title: 'Playground de Código: Aprende HTML',
      methodologies: 'aprendizaje por práctica, feedback inmediato, construccionismo',
      extras: 'editor de código en vivo, vista previa en tiempo real, resaltado de sintaxis, ejemplos precargados, desafíos progresivos'
    },
    'puzzle': {
      format: 'Juego breve (puntos, niveles)',
      title: 'Rompecabezas Matemático',
      methodologies: 'resolución de problemas, lógica matemática, gamificación',
      extras: 'niveles de dificultad creciente, pistas opcionales, temporizador opcional, sistema de estrellas, celebración al completar'
    },
    'card-match': {
      format: 'Juego breve (puntos, niveles)',
      title: 'Memoria: Empareja Conceptos',
      methodologies: 'memoria visual, asociación de conceptos, aprendizaje por repetición',
      extras: 'efecto de volteo de cartas, contador de intentos, temporizador, diferentes niveles de dificultad, animaciones suaves'
    }
  };
  
  suggestions.forEach(suggestion => {
    suggestion.addEventListener('click', () => {
      const formatType = suggestion.getAttribute('data-format');
      const template = formatTemplates[formatType];
      
      if (template) {
        // Aplicar template con animación
        formatSelect.value = template.format;
        
        // Animación de relleno
        setTimeout(() => {
          titleInput.value = template.title;
          titleInput.style.animation = 'none';
          setTimeout(() => titleInput.style.animation = '', 10);
        }, 100);
        
        setTimeout(() => {
          methodologiesInput.value = template.methodologies;
          methodologiesInput.style.animation = 'none';
          setTimeout(() => methodologiesInput.style.animation = '', 10);
        }, 200);
        
        setTimeout(() => {
          extrasInput.value = template.extras;
          extrasInput.style.animation = 'none';
          setTimeout(() => extrasInput.style.animation = '', 10);
        }, 300);
        
        // Feedback visual
        suggestion.style.transform = 'scale(0.95)';
        setTimeout(() => suggestion.style.transform = '', 200);
        
        // Scroll suave al primer campo
        titleInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
        titleInput.focus();
      }
    });
  });
}


// Inicialización
document.addEventListener('DOMContentLoaded', () => {
  setupExamples();
  setupTooltips();
  setupFormatSuggestions();
  el('addExample').addEventListener('click', addExample);
  el('clearExamples').addEventListener('click', clearExamples);
  el('generate').addEventListener('click', generateMegaprompt);
  el('generateSample').addEventListener('click', generateSampleQuick);
  el('copyBtn').addEventListener('click', copyPrompt);
  el('downloadTxt').addEventListener('click', downloadTxt);
  el('exportPdf').addEventListener('click', exportPdf);
});

function setupExamples(){
  // Crear 1 ejemplo por defecto
  addExample({
    exampleText: `Ejemplo: Crear una actividad tipo arrastrar y soltar sobre partes de la planta.
INPUT: edad=10-12; objetivos=Identificar partes de la planta; formato=actividad arrastrar-soltar.
OUTPUT esperado: HTML/CSS/JS con arrastrables, correcta validación y retroalimentación positiva.`
  });
}

function addExample({exampleText} = {}) {
  state.examplesCount++;
  const id = `ex-${state.examplesCount}`;
  const wrapper = document.createElement('div');
  wrapper.className = 'example';
  wrapper.id = id;

  const ta = document.createElement('textarea');
  ta.placeholder = 'Describe un ejemplo few-shot: entrada y salida esperada';
  ta.value = exampleText || '';

  const remove = document.createElement('button');
  remove.className = 'btn ghost';
  remove.textContent = 'Eliminar';
  remove.addEventListener('click', ()=> wrapper.remove());

  wrapper.appendChild(ta);
  wrapper.appendChild(remove);

  el('examples').appendChild(wrapper);
}

function clearExamples() {
  el('examples').innerHTML = '';
  state.examplesCount = 0;
}

function collectForm(){
  const collect = {
    title: el('title').value.trim(),
    subject: el('subject').value.trim(),
    ageRange: el('ageRange').value.trim(),
    duration: el('duration').value.trim(),
    objectives: el('objectives').value.trim(),
    format: el('format').value,
    difficulty: el('difficulty').value,
    language: el('language').value,
    methodologies: el('methodologies').value,
    promptTechniques: el('promptTechniques').value,
    accessibility: el('accessibility').value,
    techConstraints: el('techConstraints').value,
    extras: el('extras').value
  };

  // ejemplos
  const examples = [];
  document.querySelectorAll('#examples .example textarea').forEach(t => {
    if (t.value.trim()) examples.push(t.value.trim());
  });
  collect.examples = examples;
  return collect;
}

function generateMegaprompt(){
  const data = collectForm();
  const prompt = buildMegaprompt(data);
  el('megaprompt').textContent = prompt;
  // focus para accesibilidad
  el('megaprompt').focus();
}

function generateSampleQuick(){
  // Rellenar algunos campos rápidamente y generar
  el('title').value = "La fotosíntesis interactiva";
  el('subject').value = "Ciencias Naturales";
  el('ageRange').value = "10-12 años";
  el('duration').value = "25 minutos";
  el('objectives').value = "Identificar partes de la hoja; Explicar el proceso de la fotosíntesis";
  el('format').value = "Simulación / Laboratorio virtual";
  el('methodologies').value = "Aprendizaje activo, gamificación, indagación";
  el('promptTechniques').value = "system prompt, few-shot, step-by-step, persona";
  el('accessibility').value = "WCAG AA, navegación teclado, contraste alto";
  el('techConstraints').value = "Sin backend; funcionar offline; móvil y escritorio";
  el('extras').value = "Estética clara, animaciones sutiles, retroalimentación inmediata";

  clearExamples();
  addExample({exampleText: `INPUT: Simulación de intercambio de gases; OUTPUT: HTML/CSS/JS con controles, resultados medibles y tests automatizados integrados.`});
  generateMegaprompt();
}

/* Construcción del megaprompt */
function buildMegaprompt(d){
  const now = new Date().toISOString().slice(0,10);
  // Cabecera del sistema
  const sys = [
    `# Megaprompt generado el ${now}`,
    `Eres un asistente experto en creación de recursos pedagógicos interactivos y en ingeniería de prompts (prompt engineering).`,
    `Tu objetivo: generar un recurso web interactivo y accesible que cumpla los objetivos pedagógicos indicados, entregando: 1) un resumen pedagógico; 2) un plan de actividades paso a paso; 3) el código base (HTML/CSS/JS) o un JSON con la estructura interactiva; 4) criterios de evaluación y métricas; 5) instrucciones de implementación y de accesibilidad.`,
    `Responde únicamente en el idioma solicitado (${d.language || 'Español'}) y sigue las restricciones técnicas especificadas.`,
    `No hagas llamadas a APIs externas a menos que se indique; mantén la solución autoconclusiva si se pidió "sin backend".`
  ].join('\n');

  // Rol y estilo
  const role = [
    `ROL: Actúa como diseñador instruccional + desarrollador front-end accesible.`,
    `TONO: ${d.extras || 'Claro, conciso y motivador'}.`,
    `ESTRUCTURA DE LA RESPUESTA:`,
    `1) Resumen pedagógico (2-4 frases).`,
    `2) Objetivos de aprendizaje (lista).`,
    `3) Metodología y justificación pedagógica.`,
    `4) Descripción de la actividad interactiva (componentes, flujo, interacciones).`,
    `5) Entregables: c��digo (HTML/CSS/JS), assets mínimos y un snippet de integración.`,
    `6) Criterios de evaluación y rúbrica simple.`,
    `7) Instrucciones de accesibilidad y adaptaciones.`,
    `8) Pasos para llevarlo al aula y variantes/extension.`,
    `9) Si se solicita, proveer 'starter code' listo para copiar/pegar.`
  ].join('\n');

  // Inputs especificados
  const inputs = [
    `TÍTULO: ${d.title || '—'}`,
    `MATERIA / TEMA: ${d.subject || '—'}`,
    `EDAD / CURSO: ${d.ageRange || '—'}`,
    `DURACIÓN: ${d.duration || '—'}`,
    `OBJETIVOS: ${formatListSemi(d.objectives)}`,
    `FORMATO DE SALIDA: ${d.format || 'Actividad interactiva web (HTML/CSS/JS)'}`,
    `DIFICULTAD: ${d.difficulty || 'Intermedio'}`,
    `METODOLOGÍAS: ${d.methodologies || '—'}`,
    `TÉCNICAS DE PROMPT ENGINEERING A INCLUIR: ${d.promptTechniques || 'few-shot; system prompt; step-by-step'}`,
    `ACCESIBILIDAD: ${d.accessibility || 'Incluir pautas WCAG, navegación por teclado'}`,
    `RESTRICCIONES TÉCNICAS: ${d.techConstraints || '—'}`,
    `INSTRUCCIONES ADICIONALES: ${d.extras || '—'}`
  ].join('\n');

  // Few-shot examples
  const examples = [];
  if (d.examples && d.examples.length){
    d.examples.forEach((ex,i) => {
      examples.push(`EJEMPLO ${i+1}:\n${ex}`);
    });
  } else {
    examples.push(`EJEMPLO 1:\nINPUT: actividad de emparejar conceptos; OUTPUT: HTML/CSS/JS con accesibilidad y retroalimentación, incluir tests unitarios simples.`);
  }

  // Prompt engineering specs
  const pe = [
    `INSTRUCCIONES DE PROMPT-ENGINEERING (aplicar):`,
    `- Usa un system prompt claro y nociones de rol (diseñador instruccional + dev).`,
    `- Proporciona few-shot examples (ya incluidos más arriba).`,
    `- Desglosa la solución en pasos (chain-of-thought limitado a pasos de diseño, no exponerse a usuario final).`,
    `- Incluye una plantilla de salida: primero resumen, luego JSON con metadatos y finalmente el código dentro de bloques marcados (HTML/CSS/JS).`,
    `- Si se solicita código, prioriza soluciones ligeras, sin dependencias pesadas y con comentarios.`
  ].join('\n');

  // Entregable y formato
  const deliverable = [
    `ENTREGABLE REQUERIDO:`,
    `- Resumen pedagógico.`,
    `- Plan paso-a-paso para la actividad.`,
    `- Código listo para ejecutar (HTML/CSS/JS).`,
    `- Rúbrica de evaluación (mínimo 3 criterios).`,
    `- Lista de adaptaciones accesibles.`,
    `- Opcional: JSON con estructura del recurso (title, objectives, interactions, assets).`
  ].join('\n');

  // Ejecución y restricciones
  const constraints = [
    `RESTRICCIONES Y CONSIDERACIONES TÉCNICAS:`,
    `- Máximo: mantener todo en un único archivo HTML cuando se pida 'sin backend'.`,
    `- Evitar bibliotecas externas salvo que se expresamente indicado.`,
    `- Incluir comentarios en el código explicando partes clave (HTML: estructura; JS: lógica de interacción; CSS: variables y responsive).`,
    `- Garantizar navegación por teclado y etiquetas ARIA básicas.`
  ].join('\n');

  // Output format template
  const outputTemplate = [
    `SALIDA ESPERADA (plantilla para que el modelo devuelva):`,
    `---RESUMEN---`,
    `(2-4 frases)`,
    `---OBJETIVOS---`,
    `- Objetivo 1`,
    `---METODOLOGÍA---`,
    `(justificación breve)`,
    `---DESCRIPCIÓN---`,
    `(componentes e interacciones)`,
    `---CÓDIGO---`,
    "```html\n<!-- Código HTML/CSS/JS aquí -->\n```",
    `---JSON METADATA---`,
    `{\n  "title": "...",\n  "objectives": ["..."],\n  "format": "...",\n  "interactions": ["..."]\n}`,
  ].join('\n');

  // Pie con parámetros de generación para LLM (sugeridos)
  const llmParams = [
    `PARÁMETROS SUGERIDOS PARA EL MODELO (si aplica):`,
    `- temperatura: 0.2 - 0.6 (usar 0.2 para código y precisión, 0.6 para creatividad)`,
    `- máximo de tokens: 900-1800 según necesidad de código`,
    `- instrucciones: responde primero el resumen y la rúbrica, luego el código en bloques.`
  ].join('\n');

  // Compilar todo
  const parts = [
    sys,
    '',
    role,
    '',
    '--- ENTRADAS ---',
    inputs,
    '',
    '--- EJEMPLOS FEW-SHOT ---',
    examples.join('\n\n'),
    '',
    pe,
    '',
    deliverable,
    '',
    constraints,
    '',
    outputTemplate,
    '',
    llmParams,
    '',
    'NOTA FINAL: Si el formato de salida requerido es código, proporciona un "starter code" que el docente pueda copiar/pegar en un archivo .html y ejecutar localmente. Mantén toda la información lo más concreta posible.'
  ];

  return parts.join('\n');
}

function formatListSemi(text){
  if (!text) return '—';
  // split by ; or newline or comma
  const items = text.split(/;|\n/).map(s=>s.trim()).filter(Boolean);
  if (items.length<=1) return text;
  return items.map((t,i)=>`${i+1}. ${t}`).join('\n');
}

/* Acciones: copiar, descargar, exportar */
async function copyPrompt(){
  const text = el('megaprompt').textContent;
  try{
    await navigator.clipboard.writeText(text);
    flashBtn(el('copyBtn'), 'Copiado ✓');
  }catch(e){
    alert('No se pudo copiar automáticamente. Selecciona y copia manualmente.');
  }
}

function downloadTxt(){
  const text = el('megaprompt').textContent;
  const blob = new Blob([text], {type: 'text/plain;charset=utf-8'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = (el('title').value || 'megaprompt') + '.txt';
  a.click();
  URL.revokeObjectURL(url);
  flashBtn(el('downloadTxt'), 'Descargado ✓');
}

function exportPdf(){
  const element = document.createElement('div');
  element.style.padding = '16px';
  element.style.background = '#ffffff';
  element.style.color = '#111';
  element.style.maxWidth = '900px';
  element.innerHTML = `<h2>${escapeHtml(el('title').value || 'Megaprompt')}</h2><pre style="white-space:pre-wrap;font-family:monospace;">${escapeHtml(el('megaprompt').textContent)}</pre>`;
  // usar html2pdf
  const opt = {
    margin: 12,
    filename: (el('title').value || 'megaprompt') + '.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, logging: false },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };
  html2pdf().set(opt).from(element).save().then(()=> flashBtn(el('exportPdf'), 'Exportado ✓'));
}

/* Helpers */
function flashBtn(button, text){
  const original = button.textContent;
  button.textContent = text;
  setTimeout(()=> button.textContent = original, 1600);
}
function escapeHtml(str){
  return str
    .replace(/&/g,'&amp;')
    .replace(/</g,'&lt;')
    .replace(/>/g,'&gt;')
    .replace(/"/g,'&quot;');
}