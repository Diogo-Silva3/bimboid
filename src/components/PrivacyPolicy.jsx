import React from 'react';

function PrivacyPolicy() {
 return (
 <div className="container mx-auto px-4 py-8">
 <h1 className="text-3xl font-bold mb-6">Política de Privacidade</h1>

 <section className="mb-8">
 <h2 className="text-2xl font-semibold mb-4">Introdução</h2>
 <p className="text-gray-700">
 Esta Política de Privacidade descreve como BIMBO Sistema de Candidatos  coleta, usa e protege suas informações pessoais.
 Ao utilizar nossa aplicação, você concorda com os termos desta Política de Privacidade.
 </p>
 </section>

 <section className="mb-8">
 <h2 className="text-2xl font-semibold mb-4">Informações que Coletamos</h2>
 <p className="text-gray-700">
 Podemos coletar diferentes tipos de informações em conexão com os serviços que oferecemos, incluindo:
 </p>
 <ul className="list-disc list-inside text-gray-700 ml-4">
 <li>Informações de identificação pessoal (como nome, e-mail, telefone) fornecidas por você.</li>
 <li>Informações sobre o uso da aplicação.</li>
 <li>Informações de documentos anexados (tratadas conforme descrito em nossa política de dados).</li>
 {/* Adicionar outros tipos de dados coletados */}
 </ul>
 </section>

 <section className="mb-8">
 <h2 className="text-2xl font-semibold mb-4">Como Usamos Suas Informações</h2>
 <p className="text-gray-700">
 Utilizamos as informações coletadas para diversos fins, como:
 </p>
 <ul className="list-disc list-inside text-gray-700 ml-4">
 <li>Fornecer e manter nossos serviços.</li>
 <li>Processar e gerenciar cadastros e documentos.</li>
 <li>Comunicar com você.</li>
 {/* Adicionar outros usos dos dados */}
 </ul>
 </section>

 <section className="mb-8">
 <h2 className="text-2xl font-semibold mb-4">Compartilhamento de Informações</h2>
 <p className="text-gray-700">
 Não compartilhamos suas informações pessoais com terceiros, exceto conforme necessário para fornecer os serviços,
 cumprir a lei ou proteger nossos direitos.
 </p>
 {/* Detalhar cenários de compartilhamento, se houver */}
 </section>

 <section className="mb-8">
 <h2 className="text-2xl font-semibold mb-4">Segurança dos Dados</h2>
 <p className="text-gray-700">
 Implementamos medidas de segurança para proteger suas informações pessoais contra acesso não autorizado,
 alteração, divulgação ou destruição.
 </p>
 {/* Detalhar medidas de segurança */}
 </section>

 <section className="mb-8">
 <h2 className="text-2xl font-semibold mb-4">Seus Direitos (LGPD)</h2>
 <p className="text-gray-700">
 De acordo com a Lei Geral de Proteção de Dados (LGPD), você tem direitos em relação aos seus dados pessoais,
 incluindo o direito de acesso, correção, exclusão e portabilidade. Para exercer seus direitos, entre em contato conosco.
 </p>
 {/* Detalhar como o usuário pode exercer seus direitos */}
 </section>

 <section className="mb-8">
 <h2 className="text-2xl font-semibold mb-4">Alterações a Esta Política de Privacidade</h2>
 <p className="text-gray-700">
 Podemos atualizar nossa Política de Privacidade periodicamente. Notificaremos você sobre quaisquer alterações,
 publicando a nova Política de Privacidade nesta página.
 </p>
 </section>

 <section>
 <h2 className="text-2xl font-semibold mb-4">Contato</h2>
 <p className="text-gray-700">
 Se você tiver alguma dúvida sobre esta Política de Privacidade, entre em contato conosco em @grupobimbo.com.
 </p>
 </section>
 </div>
 );
}

export default PrivacyPolicy;