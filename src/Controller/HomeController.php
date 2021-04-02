<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
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
        $em = $this->getDoctrine()->getManager();

        $repository = $em->getRepository('App:BigType');
        $listBigTypes = $repository->findAll();

        return $this->render(
            'index.html.twig',
            ['listBigTypes' => $listBigTypes]
        );
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
        $em = $this->getDoctrine()->getManager();

        $repository = $em->getRepository('App:BigType');
        $listBigTypes = $repository->findAll();

        return $this->render(
            'technologies.html.twig',
            ['listBigTypes' => $listBigTypes]
        );
    }

    /**
     * @Route(
     *     "/{_locale}/realisations",
     *     name="realisations",
     *     defaults={"_locale": "fr"},
     *     requirements={"_locale": "en|fr"}
     * )
     */
    public function realisations(Request $request)
    {
        $em = $this->getDoctrine()->getManager();

        $repository = $em->getRepository('App:BigType');
        $listBigTypes = $repository->findAll();

        $repository = $em->getRepository('App:Creation');
        $listCreations = $repository->findAll();

        return $this->render(
            'realisations.html.twig',
            [
                'listCreations' => $listCreations,
                'listBigTypes' => $listBigTypes,
            ]
        );
    }

    /**
     * @Route(
     *     "/{_locale}/curriculum",
     *     name="curriculum",
     *     defaults={"_locale": "fr"},
     *     requirements={"_locale": "en|fr"}
     * )
     */
    public function curriculum()
    {
        $em = $this->getDoctrine()->getManager();

        $repository = $em->getRepository('App:BigType');
        $listBigTypes = $repository->findAll();

        return $this->render(
            'curriculum.html.twig',
            ['listBigTypes' => $listBigTypes]
        );
    }
}
