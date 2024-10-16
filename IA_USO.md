# Documentación de uso de IA en biesVM

## Resumen:
En este proyecto, se utilizó ChatGPT para recibir apoyo en el setup del proyecto, en la generación de casos de prueba y en áreas específicas del diseño del grammar en ANTLR4. Todo el core del proyecto fue desarrollado manualmente por los miembros del equipo.

## Uso de IA en las siguientes áreas:

1. **Setup del proyecto Node.js**:
   - **Herramienta**: ChatGPT.
   - **Asistencia**: Se utilizó para generar una guía paso a paso de la configuración del entorno Node.js, incluyendo la estructura del proyecto, la configuración de dependencias y scripts en el archivo `package.json`.
   - **Comando**: ChatGPT proporcionó comandos y sugerencias de configuraciones iniciales para el archivo `package.json` y las herramientas de desarrollo.
   - **Detalles**:
     - Estructura del proyecto: Sugerencias sobre la organización de directorios y archivos.
     - Configuración de dependencias: Instrucciones para instalar y configurar ESLint, Jest y Prettier.

2. **Diseño del grammar de ANTLR4**:
   - **Herramienta**: ChatGPT.
   - **Asistencia**: Se recurrió a IA para validar y ajustar la estructura inicial del grammar de la biesVM.
   - **Ejemplo**: Sugerencias sobre la incorporación de instrucciones como `NOP`, `APP`, y `SWP` en el grammar final.
   - **Detalles**:
     - Validación de la gramática: Revisión y corrección de la gramática definida en `BiesLexer.g4` y `BiesParser.g4`.
     - Incorporación de nuevas instrucciones: Asistencia en la definición de nuevas instrucciones y su sintaxis en la gramática.

3. **Generación de casos de prueba**:
   - **Herramienta**: ChatGPT.
   - **Asistencia**: Se utilizó para generar casos de prueba mínimos para la máquina virtual según la sintaxis definida.
   - **Detalles**:
     - Casos de prueba generados:
       - Máximo entre dos números.
       - Resolver una cuadrática.
       - Largo de una hilera (iterativo).
       - Invertir una hilera (reverse, iterativo).
       - Índice de una subhilera en una hilera (iterativo).
       - Chequeo de si una lista es palíndrome (iterativo y recursivo).
       - Factorial iterativo y recursivo.
       - Fibonacci iterativo y recursivo.
     - Ejemplo: Generación del caso de prueba para resolver una cuadrática utilizando lambda lifting.

4. **Preguntas técnicas**:
   - **Herramienta**: ChatGPT.
   - **Asistencia**: Se hicieron consultas sobre el funcionamiento de algunas instrucciones y cómo deberían ser parseadas por la máquina virtual.
   - **Detalles**:
     - Instrucciones específicas: Consultas sobre `BR`, `BT`, `BF`, `APP`, `LDF`, `RET`, entre otras.
     - Implementación en `cleanRunner.mjs`: Asistencia en la implementación de las instrucciones en el archivo `cleanRunner.mjs`.

## Áreas desarrolladas manualmente:
Todo el núcleo del intérprete de la biesVM, así como el diseño y ejecución de las pruebas unitarias, fue realizado por los miembros del equipo sin asistencia de IA. Esto incluye:

- Implementación del intérprete en `cleanRunner.mjs`.
- Desarrollo de la lógica de ejecución de instrucciones.
- Diseño y ejecución de pruebas unitarias.
- Documentación del proyecto en `README.md`.

## Conclusión:
El uso de ChatGPT fue limitado a áreas específicas del setup del proyecto y generación de casos de prueba, mientras que el core del proyecto fue desarrollado manualmente por los miembros del equipo. Este enfoque permitió un aprendizaje más profundo y una mejor comprensión de los conceptos clave del proyecto.
