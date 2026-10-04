# Alcance del MVP de FlowSync

**Estado:** alcance consensuado, base del PRD (el PRD aún no está escrito).
**Validación:** caso de estudio, no cliente real. Lo que aquí se afirma está contrastado con una hipótesis, no con uso.

Este documento se queda a nivel de producto. Modelo de datos, estados internos, endpoints y requisitos técnicos se deciden más adelante.

---

## 1. Problema

En equipos remotos pequeños, el estado del trabajo solo se conoce preguntando. La ronda de «¿en qué estás?» se come la mitad de la daily de 15 minutos y se repite por Slack o chat. Nadie ve el estado del equipo sin interrumpir a alguien.

El coste real no es la interrupción, sino el trabajo duplicado. Episodio concreto: dos personas del equipo tocaron el mismo módulo la misma semana porque una empezó sin que la otra lo supiera. Dos días perdidos.

Qué desaparece y qué no: desaparece la ronda de «¿en qué estás?». **La daily no desaparece entera**: la parte de bloqueos sigue y este MVP no la resuelve.

## 2. Usuarios

- Equipos remotos pequeños, de **3 a 10 personas**, con roles planos: todos ven y editan lo mismo.
- **Quien cobra el valor son los pares**, no un lead. No hay reporte hacia arriba y a un manager le daría igual. Duele a quienes descubren tarde que iban a lo mismo y a quien interrumpe a otro para preguntar.
- Quien escribe el estado es quien lee. Esa lista es su propia cola de trabajo: la mira para decidir qué coge y, a cambio, deja de recibir interrupciones. Si el beneficio fuera solo para los demás, no la mantendría.
- **Primer usuario concreto:** equipo de 6 personas de producto SaaS, en 3 husos horarios, que hoy usa un gestor de tareas pesado y una daily de 15 minutos por videollamada. **Es un caso de estudio, no un cliente real.**

Supuestos: un solo equipo por espacio, de 3 a 10 personas. Confianza total entre sus miembros, incluida la edición del estado de tareas ajenas. La daily seguirá existiendo para los bloqueos.

## 3. Propuesta de valor

**El estado del equipo se ve de un vistazo, sin preguntar.** Quien hace la tarea cambia su estado en dos clics y el resto lo ve al momento, sin refrescar ni preguntar.

La decisión que cambia: no empezar algo que otra persona ya está tocando, y elegir lo siguiente sabiendo qué está libre. Si la única respuesta fuera «sentirse informado», el tiempo real no valdría lo que cuesta.

Cómo se entiende «tiempo real»: ver los cambios de estado de las tareas sin refrescar. Es frescura de la **tarea**, no presencia de la persona. No es chat, ni videollamada, ni edición simultánea.

Por qué se sostiene: son dos clics sobre una lista ya abierta, sin campos obligatorios y sin decidir sprint ni estimación. FlowSync sustituye al gestor de tareas, no convive con él: es donde se hace el trabajo, no donde se cuenta.

**Éxito:** tras una semana de uso real, el equipo cancela la ronda de «¿en qué estás?» y nadie pide que vuelva. Si la siguen haciendo igual, no funcionó. Con un caso de estudio, antes de eso solo puede validarse el recorrido: que alguien cree, coja y mueva una tarea en segundos y que otra persona lo vea sin preguntar.

**Riesgos a validar:**
1. **La información se queda vieja.** Entonces el producto pierde el sentido. Es el riesgo principal. La mitigación es que actualizar cueste dos clics, no obligar a nadie.
2. **El hábito que evita el trabajo duplicado es crear la tarea antes de empezar**, no solo actualizarla. Se prueba repitiendo el episodio de los dos días perdidos y viendo si habrían coincidido.
3. **Migrar duele.** Sustituir el gestor actual obliga a rehacer a mano el trabajo en curso, y mantener los dos supone doble actualización.

## 4. Alcance (dentro del MVP)

Una sola capability terminada de punta a punta: la lista compartida.

1. **Un espacio compartido único.** Todos los miembros ven y editan la misma lista.
2. **Crear una tarea en segundos.** Solo el título es obligatorio.
3. **Responsable opcional.** Una tarea sin responsable está libre, y cualquiera la coge en un clic.
4. **Cambiar el estado en dos clics.** Pocos estados y fijos. Los valores concretos se deciden en diseño. Tienen que distinguir lo libre de lo que alguien ya está tocando.
5. **Filtrar por estado.** La vista inicial es lo pendiente. Los cambios aparecen solos mientras la lista está abierta.

Condiciones mínimas para que lo anterior sirva:

- **Corregir el título y borrar una tarea**, para que la lista no se pudra.
- **Acceso restringido a miembros del espacio.** Hoy el registro está abierto a cualquiera. Con un espacio único, cualquiera que se registrara vería el trabajo del equipo. El mecanismo se decide más adelante.

Guardarraíles: ningún campo obligatorio más allá del título, y el estado es de la tarea, nunca de la persona.

## 5. NO-alcance (fuera del MVP)

| Excluido | Por qué sale |
|---|---|
| **Fecha de vencimiento** | No sirve a la decisión central ni al criterio de éxito. Sirve para ver qué se ha pasado de plazo, que es lo que quiere un manager, y aquí no hay. En 3 husos horarios «vence el martes» es ambiguo. Se pidió en la primera definición de tarea, y se recorta a propósito. |
| **«Qué se ha movido desde tu última visita»** | Cubre «vuelvo de una reunión y veo qué cambió», pero el criterio de éxito se cumple viendo el estado actual y su responsable. Sin esto, el tiempo real se limita a mientras la lista está abierta. |
| **Varios equipos, o personas en más de uno** | Obliga a introducir la noción de «equipo». Con un solo equipo de 3 a 10 personas no hace falta. Queda anotado como supuesto. |
| **Roles y permisos** | Con 3 a 10 personas y confianza total no resuelven un problema real, y añaden configuración, que es justo el «rollo» a evitar. |
| **Notificaciones push** | Rompen el principio de la señal: es un resumen que espera, no un aviso que interrumpe. |
| **Presencia y actividad de personas** | Es vigilancia y se rechaza a propósito. El estado es de la tarea, no de la persona. |
| **Chat, comentarios y descripciones largas** | Convertirían la lista en otro canal de conversación, para lo que ya existe Slack. Los comentarios en tareas son el chat por la puerta de atrás. |
| **Edición simultánea de un mismo documento** | «Tiempo real» aquí es frescura del estado, no colaboración sobre un documento. |
| **Derivar el estado de Git, PRs, CI o calendario** | Es otro producto, con integraciones y OAuth de terceros. El estado lo teclea quien hace la tarea. |
| **Importar o sincronizar con otro gestor** | FlowSync sustituye al gestor, no convive con él. Convivir exige doble actualización, que es como muere esta categoría. |
| **Sprints, estimaciones, épicas, backlog priorizado e informes** | Renuncia explícita. Un equipo que necesite esto no es el usuario. |
| **Resolver bloqueos** | La parte de bloqueos de la daily sigue y el MVP no la toca. No hay que venderlo de más. |
| **Estados configurables** | Es configuración, es el rollo de Jira. Unos pocos estados fijos bastan para decidir qué está libre. |
| **Etiquetas, módulo o área** | Parecen servir al episodio del módulo duplicado, pero añaden campos. Un título bien escrito basta, y si no basta se sabrá con el caso de estudio. |
| **Vista por persona, búsqueda y orden personalizado** | Con 3 a 10 personas se recorre la lista. Se echará en falta, pero no hace falta para validar. |
| **Historial y auditoría de cambios** | Sirve a quien supervisa, y no hay supervisor. |

Candidatos a volver primero, si el uso real los pide: fecha de vencimiento, «qué se ha movido desde tu última visita» y vista por persona.
