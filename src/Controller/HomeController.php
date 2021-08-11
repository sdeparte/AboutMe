<?php

namespace App\Controller;

use App\Entity\BigType;
use App\Services\MenuCreator;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Contracts\Translation\TranslatorInterface;

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
    public function index(MenuCreator $menuCreator)
    {
        $em = $this->getDoctrine()->getManager();

        $repository = $em->getRepository('App:BigType');
        $listBigTypes = $repository->findAll();

        return $this->render(
            'index.html.twig',
            [
                'menu' => $menuCreator->generateMenu($listBigTypes),
                'listBigTypes' => $listBigTypes,
            ]
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
    public function technologies(MenuCreator $menuCreator)
    {
        $em = $this->getDoctrine()->getManager();

        $repository = $em->getRepository('App:BigType');
        $listBigTypes = $repository->findAll();

        return $this->render(
            'technologies.html.twig',
            [
                'menu' => $menuCreator->generateMenu($listBigTypes),
                'listBigTypes' => $listBigTypes,
            ]
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
    public function realisations(MenuCreator $menuCreator, Request $request)
    {
        $em = $this->getDoctrine()->getManager();

        $repository = $em->getRepository('App:BigType');
        $listBigTypes = $repository->findAll();

        $bigTypesToShow = $request->get('bigTypesToShow');

        if (null !== $bigTypesToShow) {
            $bigTypesToShow = explode(';', $bigTypesToShow);

            /** @var BigType $bigType */
            foreach ($listBigTypes as $bigType) {
                if (!\in_array($bigType->getId(), $bigTypesToShow)) {
                    $bigType->setSelected(false);
                }
            }
        }

        $repository = $em->getRepository('App:Creation');
        $listCreations = $repository->findAll();

        return $this->render(
            'realisations.html.twig',
            [
                'menu' => $menuCreator->generateMenu($listBigTypes),
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
    public function curriculum(MenuCreator $menuCreator)
    {
        $em = $this->getDoctrine()->getManager();

        $repository = $em->getRepository('App:BigType');
        $listBigTypes = $repository->findAll();

        return $this->render(
            'curriculum.html.twig',
            [
                'menu' => $menuCreator->generateMenu($listBigTypes),
                'listBigTypes' => $listBigTypes,
            ]
        );
    }
}
