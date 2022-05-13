    $(function () {

    var operacao = "A"; //"A"=Adição; "E"=Edição

    var indice_selecionado = -1; // ao armazenar eles e listar ele vai estar

    var tbChamados = localStorage.getItem("tbChamados");// Recupera os dados armazenados

    tbChamados = JSON.parse(tbChamados); // Converte string para objeto

    if (tbChamados == null) // Caso não haja conteúdo, iniciamos um vetor vazio
        tbChamados = [];

    // Função para adicionar registros
    function Adicionar() {
        //variável para verificar se número de código já existe
        var cha = GetCliente("Codigo", $("#txtCodigo").val());
        // Caso existe é informado ao cliente
        if (cha != null) {
            alert("Código já cadastrado.");
            return;
        }
        // caso contrário insere
        var add = JSON.stringify({
            Codigo: $("#txtCodigo").val(),
            Data: $("#txtData").val(),
            Horario: $("#txtHora").val(),
            Categoria: $("#txtCategoria").val(),
            Problema: $("#txtProblema").val(),
            Usuario: $("#txtUsuario").val(),
            Prioridade: $("#txtPrioridade").val()
        });

        tbChamados.push(add);

        localStorage.setItem("tbChamados", JSON.stringify(tbChamados));

        alert("Registro adicionado.");

        return true;
    }

    // Função para editar clientes
    function Editar() {
        tbChamados[indice_selecionado] = JSON.stringify({
            Codigo: $("#txtCodigo").val(),
            Data: $("#txtData").val(),
            Horario: $("#txtHora").val(),
            Categoria: $("#txtCategoria").val(),
            Problema: $("#txtProblema").val(),
            Usuario: $("#txtUsuario").val(),
            Prioridade: $("#txtPrioridade").val()
        });

        localStorage.setItem("tbChamados", JSON.stringify(tbChamados));
        alert("Informações editadas.")
        operacao = "A";
        return true;
    }
    // Função para listar clientes
    function Listar() {
        $("#tblListar").html("");
        $("#tblListar").html(
            "<thead>" +
            "	<tr>" +
            "<th></th>" +
            "	<th>Número do chamado</th>" +
            "	<th>Data</th>" +
            "	<th>Horário</th>" +
            "	<th>Categoria</th>" +
            "	<th>Descrição do problema</th>" +
            "	<th>Usuário</th>" +
            "	<th>Prioridade</th>" +
            "	</tr>" +
            "</thead>" +
            "<tbody>" +
            "</tbody>"
        );

        // Malha de repetição para inserir todos os registros
        for (var i in tbChamados) {
            var cha = JSON.parse(tbChamados[i]);
            $("#tblListar tbody").append("<tr>" +
                "	<td><img src='/img/editar3.png' alt='" + i + "' class='btnEditar'/><img src='/img/excluir.png' alt='" + i + "' class='btnExcluir'/></td>" +
                "	<td>" + cha.Codigo + "</td>" +
                "	<td>" + cha.Data + "</td>" +
                "	<td>" + cha.Horario + "</td>" +
                "	<td>" + cha.Categoria + "</td>" +
                "	<td>" + cha.Problema + "</td>" +
                "	<td>" + cha.Usuario + "</td>" +
                "	<td>" + cha.Prioridade + "</td>" +
                "</tr>");
        }
    }
    // Função para excluir registros
    function Excluir() {
        tbChamados.splice(indice_selecionado, 1);
        localStorage.setItem("tbChamados", JSON.stringify(tbChamados));
        alert("Registro excluído.");
    }

    // função par pesquisar cliente
    function GetCliente(propriedade, valor) {
        var cha = null;
        for (var item in tbChamados) {
            var i = JSON.parse(tbChamados[item]);
            if (i[propriedade] == valor)
                cha = i;
        }
        return cha;
    }
    // chamda da função listar clientes
    Listar();

    // Ação com base nos eventos de formulário
    $("#frmChamado").on("submit", function () {
        if (operacao == "A")
            return Adicionar();
        else
            return Editar();
    });
    // Ação com base nos eventos do botão Editar
    $("#tblListar").on("click", ".btnEditar", function () {
        operacao = "E";
        indice_selecionado = parseInt($(this).attr("alt"));
        var cha = JSON.parse(tbChamados[indice_selecionado]);
        $("#txtCodigo").val(cha.Codigo);
        $("#txtData").val(cha.Nome);
        $("#txtHora").val(cha.Telefone);
        $("#txtCategoria").val(cha.Email);
        $("#txtProblema").val(cha.Email);
        $("#txtUsuario").val(cha.Email);
        $("#txtPrioridade").val(cha.Email);
        $("#txtCodigo").attr("readonly", "readonly");
        $("#txtNome").focus();
    });

    // Ação com base nos eventos do botão Excluir
    $("#tblListar").on("click", ".btnExcluir", function () {
        indice_selecionado = parseInt($(this).attr("alt"));
        Excluir();
        Listar();

    });
});