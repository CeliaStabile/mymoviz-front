# Mymoviz

## Description du projet

Site web présentant les derniers synopsis de films. Données provenant de l'API The Movie Data Base. Possibilité de noter les films et les ajouter aux favoris.

## Technologies 

Un backend très simple avec Express / Node.js.

Frontend en React.

## Server Side Rendering : React et le SEO

L'intérêt de ce projet était de m'entrainer à utiliser du Server Side Rendering afin d'éviter les problèmes liés à Javascript et le SEO.

 React seul ne génère pas de HTML dans le code source de la page.
 
❌ Un site en React = un site pas visible par Google

- Next.js pre-render chaque page par défaut. Le contenu directement écrit dans le composant sera présent en HTML dans le code source.

✅ HTML dans le code source = site visible par Google

⚠ PROBLEME ⚠

Si le contenu provient d'une API ou d'une base de donnée, il n'apparaitra pas dans le code source de la page par défaut.
CF le présent exemple :  par défaut, sans JS le contenu de la page n'apparait pas, donc Google n'y a pas accès.

💊 SOLUTION 💊

Implémenter du Server-Side Rendering via la fonction getServerSideProps qui permet d'envoyer toute la page en HTML au serveur, contenu externe compris. Utile lorsque notre contenu provient d'une API et change fréquement. A voir ici dans la page index qui utilise la fonction getServerSideProps pour faire appel à mon backend. Si l'on désactive JS, le contenu de l'API est maintenant visible quand même, et donc accessible par Google.

