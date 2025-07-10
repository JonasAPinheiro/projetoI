/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import type { TsoaRoute } from '@tsoa/runtime';
import {  fetchMiddlewares, ExpressTemplateService } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { UsuarioController } from './../controller/UsuarioController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { LivroController } from './../controller/LivroController';
import type { Request as ExRequest, Response as ExResponse, RequestHandler, Router } from 'express';



// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
    "BasicResponseDto": {
        "dataType": "refObject",
        "properties": {
            "message": {"dataType":"string","required":true},
            "object": {"dataType":"any","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Status": {
        "dataType": "refAlias",
        "type": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["ativo"]},{"dataType":"enum","enums":["inativo"]},{"dataType":"enum","enums":["suspenso"]}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UsuarioRequestDto": {
        "dataType": "refObject",
        "properties": {
            "nome": {"dataType":"string","required":true},
            "email": {"dataType":"string","required":true},
            "cpf": {"dataType":"string","required":true},
            "ativo": {"ref":"Status","default":"ativo"},
            "categoriaId": {"dataType":"double","required":true},
            "cursoId": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UsuarioUpdateDto": {
        "dataType": "refObject",
        "properties": {
            "nome": {"dataType":"string","required":true},
            "email": {"dataType":"string","required":true},
            "ativo": {"ref":"Status","required":true},
            "categoriaId": {"dataType":"double","required":true},
            "cursoId": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "LivroRequestDto": {
        "dataType": "refObject",
        "properties": {
            "titulo": {"dataType":"string","required":true},
            "autor": {"dataType":"string","required":true},
            "editora": {"dataType":"string","required":true},
            "edicao": {"dataType":"string","required":true},
            "isbn": {"dataType":"string","required":true},
            "categoriaId": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "LivroUpdateDto": {
        "dataType": "refObject",
        "properties": {
            "titulo": {"dataType":"string","required":true},
            "autor": {"dataType":"string","required":true},
            "editora": {"dataType":"string","required":true},
            "edicao": {"dataType":"string","required":true},
            "categoriaId": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const templateService = new ExpressTemplateService(models, {"noImplicitAdditionalProperties":"throw-on-extras","bodyCoercion":true});

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa




export function RegisterRoutes(app: Router) {

    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################


    
        const argsUsuarioController_listarUsuarios: Record<string, TsoaRoute.ParameterSchema> = {
                sucess: {"in":"res","name":"200","required":true,"ref":"BasicResponseDto"},
                notFound: {"in":"res","name":"400","required":true,"ref":"BasicResponseDto"},
        };
        app.get('/usuarios',
            ...(fetchMiddlewares<RequestHandler>(UsuarioController)),
            ...(fetchMiddlewares<RequestHandler>(UsuarioController.prototype.listarUsuarios)),

            async function UsuarioController_listarUsuarios(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUsuarioController_listarUsuarios, request, response });

                const controller = new UsuarioController();

              await templateService.apiHandler({
                methodName: 'listarUsuarios',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsUsuarioController_listarUsuarioPorCpf: Record<string, TsoaRoute.ParameterSchema> = {
                cpf: {"in":"path","name":"cpf","required":true,"dataType":"string"},
                sucess: {"in":"res","name":"200","required":true,"ref":"BasicResponseDto"},
                notFound: {"in":"res","name":"400","required":true,"ref":"BasicResponseDto"},
        };
        app.get('/usuarios/:cpf',
            ...(fetchMiddlewares<RequestHandler>(UsuarioController)),
            ...(fetchMiddlewares<RequestHandler>(UsuarioController.prototype.listarUsuarioPorCpf)),

            async function UsuarioController_listarUsuarioPorCpf(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUsuarioController_listarUsuarioPorCpf, request, response });

                const controller = new UsuarioController();

              await templateService.apiHandler({
                methodName: 'listarUsuarioPorCpf',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsUsuarioController_cadastrarUsuario: Record<string, TsoaRoute.ParameterSchema> = {
                dto: {"in":"body","name":"dto","required":true,"ref":"UsuarioRequestDto"},
                sucess: {"in":"res","name":"201","required":true,"ref":"BasicResponseDto"},
                fail: {"in":"res","name":"400","required":true,"ref":"BasicResponseDto"},
        };
        app.post('/usuarios',
            ...(fetchMiddlewares<RequestHandler>(UsuarioController)),
            ...(fetchMiddlewares<RequestHandler>(UsuarioController.prototype.cadastrarUsuario)),

            async function UsuarioController_cadastrarUsuario(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUsuarioController_cadastrarUsuario, request, response });

                const controller = new UsuarioController();

              await templateService.apiHandler({
                methodName: 'cadastrarUsuario',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsUsuarioController_atualizarUsuario: Record<string, TsoaRoute.ParameterSchema> = {
                cpf: {"in":"path","name":"cpf","required":true,"dataType":"string"},
                dto: {"in":"body","name":"dto","required":true,"ref":"UsuarioUpdateDto"},
                sucess: {"in":"res","name":"200","required":true,"ref":"BasicResponseDto"},
                notFound: {"in":"res","name":"400","required":true,"ref":"BasicResponseDto"},
        };
        app.put('/usuarios/:cpf',
            ...(fetchMiddlewares<RequestHandler>(UsuarioController)),
            ...(fetchMiddlewares<RequestHandler>(UsuarioController.prototype.atualizarUsuario)),

            async function UsuarioController_atualizarUsuario(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUsuarioController_atualizarUsuario, request, response });

                const controller = new UsuarioController();

              await templateService.apiHandler({
                methodName: 'atualizarUsuario',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsUsuarioController_removerUsuario: Record<string, TsoaRoute.ParameterSchema> = {
                cpf: {"in":"path","name":"cpf","required":true,"dataType":"string"},
                sucess: {"in":"res","name":"200","required":true,"ref":"BasicResponseDto"},
                notFound: {"in":"res","name":"400","required":true,"ref":"BasicResponseDto"},
        };
        app.delete('/usuarios/:cpf',
            ...(fetchMiddlewares<RequestHandler>(UsuarioController)),
            ...(fetchMiddlewares<RequestHandler>(UsuarioController.prototype.removerUsuario)),

            async function UsuarioController_removerUsuario(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUsuarioController_removerUsuario, request, response });

                const controller = new UsuarioController();

              await templateService.apiHandler({
                methodName: 'removerUsuario',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsLivroController_listarLivros: Record<string, TsoaRoute.ParameterSchema> = {
                sucess: {"in":"res","name":"200","required":true,"ref":"BasicResponseDto"},
                notFound: {"in":"res","name":"400","required":true,"ref":"BasicResponseDto"},
        };
        app.get('/livros',
            ...(fetchMiddlewares<RequestHandler>(LivroController)),
            ...(fetchMiddlewares<RequestHandler>(LivroController.prototype.listarLivros)),

            async function LivroController_listarLivros(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsLivroController_listarLivros, request, response });

                const controller = new LivroController();

              await templateService.apiHandler({
                methodName: 'listarLivros',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsLivroController_listarLivroPorIsbn: Record<string, TsoaRoute.ParameterSchema> = {
                isbn: {"in":"path","name":"isbn","required":true,"dataType":"string"},
                sucess: {"in":"res","name":"200","required":true,"ref":"BasicResponseDto"},
                notFound: {"in":"res","name":"400","required":true,"ref":"BasicResponseDto"},
        };
        app.get('/livros/:isbn',
            ...(fetchMiddlewares<RequestHandler>(LivroController)),
            ...(fetchMiddlewares<RequestHandler>(LivroController.prototype.listarLivroPorIsbn)),

            async function LivroController_listarLivroPorIsbn(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsLivroController_listarLivroPorIsbn, request, response });

                const controller = new LivroController();

              await templateService.apiHandler({
                methodName: 'listarLivroPorIsbn',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsLivroController_cadastrarLivro: Record<string, TsoaRoute.ParameterSchema> = {
                dto: {"in":"body","name":"dto","required":true,"ref":"LivroRequestDto"},
                sucess: {"in":"res","name":"201","required":true,"ref":"BasicResponseDto"},
                fail: {"in":"res","name":"400","required":true,"ref":"BasicResponseDto"},
        };
        app.post('/livros',
            ...(fetchMiddlewares<RequestHandler>(LivroController)),
            ...(fetchMiddlewares<RequestHandler>(LivroController.prototype.cadastrarLivro)),

            async function LivroController_cadastrarLivro(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsLivroController_cadastrarLivro, request, response });

                const controller = new LivroController();

              await templateService.apiHandler({
                methodName: 'cadastrarLivro',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsLivroController_atualizarLivro: Record<string, TsoaRoute.ParameterSchema> = {
                isbn: {"in":"path","name":"isbn","required":true,"dataType":"string"},
                dto: {"in":"body","name":"dto","required":true,"ref":"LivroUpdateDto"},
                sucess: {"in":"res","name":"200","required":true,"ref":"BasicResponseDto"},
                notFound: {"in":"res","name":"400","required":true,"ref":"BasicResponseDto"},
        };
        app.put('/livros/:isbn',
            ...(fetchMiddlewares<RequestHandler>(LivroController)),
            ...(fetchMiddlewares<RequestHandler>(LivroController.prototype.atualizarLivro)),

            async function LivroController_atualizarLivro(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsLivroController_atualizarLivro, request, response });

                const controller = new LivroController();

              await templateService.apiHandler({
                methodName: 'atualizarLivro',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsLivroController_removerLivro: Record<string, TsoaRoute.ParameterSchema> = {
                isbn: {"in":"path","name":"isbn","required":true,"dataType":"string"},
                sucess: {"in":"res","name":"200","required":true,"ref":"BasicResponseDto"},
                notFound: {"in":"res","name":"400","required":true,"ref":"BasicResponseDto"},
        };
        app.delete('/livros/:isbn',
            ...(fetchMiddlewares<RequestHandler>(LivroController)),
            ...(fetchMiddlewares<RequestHandler>(LivroController.prototype.removerLivro)),

            async function LivroController_removerLivro(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsLivroController_removerLivro, request, response });

                const controller = new LivroController();

              await templateService.apiHandler({
                methodName: 'removerLivro',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa


    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
