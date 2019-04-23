<?php

namespace App\Controller;

use App\Entity\Article;
use App\Manager\ArticleManager;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class HomeController extends AbstractController
{
    /**
     * @Route("/home", name="home")
     */
    public function index()
    {
        return $this->render('home/index.html.twig', [
            'controller_name' => 'HomeController',
        ]);
    }

    /**
     * @Route("/{_locale}/articles", name="articles", requirements={"_locale":".{2}"})
     */
    public function articles(ArticleManager $articleManager)
    {
        $articles = $articleManager->getLast10Articles();
        $env = $articleManager->getEnv();

        return $this->render('articles.html.twig', [
            'articles' => $articles,
            'env' => $env,
        ]);
    }
}
