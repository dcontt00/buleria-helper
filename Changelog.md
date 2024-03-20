## [1.6.1] - 2024-03-20

### Changed

- SherpaRomeo: Ajustadas columnas de resultados de busqueda

### Fixed

- SherpaRomeo: Busqueda de varios ISSNs en portalcientifico
- Autores: Arreglado error que no pegaba autores

## [1.6.0] - 2024-03-19

### Fixed

- FileRename: Reorganizado filerename en pagina
- FileRename: Aumentado tamaño texto de pagina
- Keywords: Centrados elementos

### Added

- SherpaRomeo: Añadido boton de busqueda en los documentos de portalcientifico.unileon.es

## [1.5.0] - 2024-03-19

### Added

- DoiSearch: Ahora tambien se puede hacer la búsqueda en la propia página

### Changed

- Reoganizados botones para mostrar SherpaRomeo y Buscar DOI juntos

## [1.4.1] - 2024-03-18

### Fixed

- DOISearch: Arreglado error que no daba ningun resultado al buscar un DOI

## [1.4.0] - 2024-03-15

### Added

- FileRename: Las comillas también se eliminan ahora
- DOISearch: Busca un DOI y devuelve info

### Fixed

- SherpaRomeo: Ya no aparece mensaje de no encontrado aunque encuentre un ISSN

## [1.3.5] - 2024-03-14

### Fixed

- SherpaRomeo: Ya no aparece mensaje de no encontrado aunque encuentre un ISSN

## [1.3.4] - 2024-03-14

### Added

- SherpaRomeo: En la pagina si no se encuentra nada mostrará un mensaje

## [1.3.3] - 2024-03-14

### Fixed

- SherpaRomeo: Arreglado error que mostraba la busqueda anterior cuando se hacia una nueva

## [1.3.2] - 2024-03-14

### Fixed

- SherpaRomeo: Se vuelve a mostrar si no se encuentra un ISSN

## [1.3.1] - 2024-03-14

### Added

- SherpaRomeo: Ahora se pueden poner varios ISSNs separados por comas y se mostrará la info del ISSN que se encuentre
- SherpaRomeo: En la pagina de envio tambien se buscará entre los ISSNs y ESSNs

## [1.3.0] - 2024-03-14

### Added

- SherpaRomeo: Textfield con editorial en pagina de envios

### Changed

- SherpaRomeo: Adaptado el tamaño de la letra en la pagina de envios

## [1.2.10] - 2024-03-14

### Added

- SherpaRomeo: Añadido textfield de editorial con boton para copiar

## [1.2.9] - 2024-03-13

### Fixed

- Keywords: Error que no permitia separar por un separador añadido

## [1.2.8] - 2024-03-13

### Added

- SherpaRomeo: Añadido indicador de tarifa

## [1.2.7] - 2024-03-12

### Added

- Authors: Añadido boton para eliminar autores de un item

## [1.2.6] - 2024-03-12

### Fixed

- SherpaRomeo: Arreglado error que hacia que no se mostrase

## [1.2.5] - 2024-03-11

### Added

- SherpaRomeo: Ahora aparece la editorial
- FileRename: Se eliminarán las palabras "al", "e", "u" y "del" en el nombre de archivo

## [1.2.4] - 2024-03-08

### Fixed

- Nombre archivo: No se eliminaban los signos de puntuación

### Changed

- Nombre Archivo: Movido al final de la página

## [1.2.3] - 2024-03-06

### Fixed

- APAGenerator: Arreglado error con numero de paginas

## [1.2.2] - 2024-03-06

### Fixed

- Authors: Al añadir un nombre con tildes ponia mal las mayusculas
- Keywords: Todas las palabras en una keyword se ponen ahora en mayusculas

## [1.2.1] - 2024-02-13

### Added

- Ahora la extension se puede usar en sidepanel

## [1.2.0] - 2024-01-25

### Added

- SherpaRomeo: Añadido acordeón e iconos para ver todo más fácil de primeras
- SherpaRomeo: Añadido un botón en página al lado de los issn para buscar en SherpaRomeo
- APAGenerator: Selección del tipo de documento para crear la cita

### Changed

- Keywords: Se añaden las keywords con la primera letra de la primera palabra en mayuscula

## [1.1.1] - 2024-01-19

### Added

- Authors: Añadir autores pulsando Enter
- Authors: Al añadir un autor el foco se mueve al textfield de nombre
- Authors: Boton de añadir autor bloqueado hasta que se introduzca un nombre y apellido

### Fixed

- APAGenerator: Texto de boton en página
- Authors: Layout de los textfields

### Removed

- Updater: Las actualizaciones se llevan a cabo automáticamente por Mozilla

## [1.1.0] - 2024-01-19

### Added

- APAGenerator: Boton en la pagina para generar la Cita APA
- APAGenerator: Paginas inicial y final si existen
- FileRenamer: Campo de texto que genera el nombre de archivo directamente en la pagina

## [1.0.2] - 2024-01-18

### Added

- Keywords: Añadido boton para corregir las palabras clave que están puestas en una sola linea automaticamente

### Changed

- Añadida actualización automática

## [1.0.1] - 2024-01-18

### Added

- Añadido texto a modulos que no lo tenian (APAGenerator, FileRename, Authors)

### Fixed

- SherpaRomeo: Cambiado texto

### Changed

- Authors: Modificado icono del boton del menu principal

## [1.0.0] - 2024-01-17

### Added

- Updater: Cuando haya una versión nueva en github, mostrará un aviso junto con un botón para actualizar.
- Authors: Permite añadir autores con autoria de manera automática

### Fixed

- APAGenerator: Error que hacia que se colgara

## [0.9.0] - 2024-01-15

### Added

- Establecer separador de las keywords en caso de que no se detecte
- Añadida barra de carga en keywords
- Nueva herramienta Nombre Archivo. Esta herramienta permite obtener el nombre de archivo a partir del titulo

### Fixed

- Error que no mostraba post de sherpa romeo

## [0.8.0] - 2024-01-12

### Added

- Mejoras en la interfaz
- Búsqueda en SherpaRomeo
- Herramienta para pegar palabras clave

### Changed

- Interfaz de botones

## [0.5.0] - 2024-01-09

### Added

- Generador de citas APA
