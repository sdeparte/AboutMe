<?php

namespace App\Controller;

use App\Entity\Article;
use App\Manager\ArticleManager;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class HomeController extends AbstractController
{
    /**
     * @Route(
     *     "/{_locale}",
     *     name="homepage",
     *     defaults={"_locale": "fr"},
     *     requirements={"_locale": "en|fr"}
     * )
     */
    public function index()
    {
        return $this->render('index.html.twig');
    }

    /**
     * @Route(
     *     "/{_locale}/technologies",
     *     name="technologies",
     *     defaults={"_locale": "fr"},
     *     requirements={"_locale": "en|fr"}
     * )
     */
    public function technologies()
    {
        return $this->render('technologies.html.twig');
    }
}
