import * as Yup from 'yup';
const connection = require('../database/database');
const CreateUser = require('../database/models/CreateUser');

connection.authenticate().then(() => {
    console.log("Conexão efetuada com sucesso!");
}).catch((err) => {
    console.log("Falha na conexão");
});

class CreateAccount {
    async store(req, res) {
        const schema = Yup.object().shape({
            nome: Yup.string().required(),
            sobrenome: Yup.string().required(),
            cpf: Yup.string().required(),
            cnpj: Yup.string().notRequired(),
            email: Yup.string().required(),
            senha: Yup.string().required()
        });

        try {
            await schema.validate(req.body, { abortEarly: false });
        } catch(err) {
            return res.status(400).json(err.errors);
        }

        const { nome, sobrenome, cpf, cnpj, email, senha } = req.body;

        try {
            const userExists = await CreateUser.findOne({
                where: { 
                    email: email,
                    cpf: cpf
                }
            });

            if(userExists) {
                return res.status(409).json({ error: "Usuário já possui cadastro. Tente novamente ou efetue login com outra conta." });
            }

            await CreateUser.create({
                nome,
                sobrenome,
                cpf,
                cnpj,
                email,
                senha
            });

            return res.status(200).json({ message: "Usuário criado com sucesso!" });
        } catch (error) {
            console.error("Erro ao criar usuário:", error);
            return res.status(500).json({ error: "Erro interno do servidor ao criar usuário." });
        }
    }
}

export default new CreateAccount();
