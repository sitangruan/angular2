This is demo project developed to prove the learning level of Angular. It covers these points:

 1. Angular V20
 2. Typescript
 3. Tailwind
 4. Angular routing, route guard, multi level routes.
 5. Angular module, Angular component
 6. Angular directives, render2.
 7. Reactive form, validators.
 8. Angular service, denpendency injection.
 9. HttpClient, observable
 10. Docker deployment


To run on your local:
run "ng serve" in the terminal.

To build and run the docker image:
In root folder run the two commands to create the image and then run the container:

docker compose build --no-cache

docker compose up

After the contaienr is running, you can access the page via http://localhost:8080 where 8080 is mapped host port number. 
You can change the ports mapping in the docker-compose.yml file.

It is using Tailwind css to support easy responsive layout. 
Initially it was using less for stylesheet format but then was changed to css because less has some conflict with Tailwind in new versions.

The source codes url is:
https://github.com/sitangruan/angular2

The deployment url is:
https://brave-bush-06c49500f.3.azurestaticapps.net

By Sitang Ruan.
https://www.linkedin.com/in/sitang-ruan/


Thanks for viewing!




# Angular2

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.3.3.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
