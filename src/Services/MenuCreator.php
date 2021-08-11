<?php


namespace App\Services;


use App\Entity\BigType;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Contracts\Translation\TranslatorInterface;

class MenuCreator
{
    /**
     * @var UrlGeneratorInterface
     */
    private $router;

    /**
     * @var TranslatorInterface
     */
    private $translator;

    /**
     * MenuCreator constructor.
     *
     * @param TranslatorInterface $translator
     */
    public function __construct(UrlGeneratorInterface $router, TranslatorInterface $translator)
    {
        $this->router = $router;
        $this->translator = $translator;
    }

    /**
     * @return array
     */
    public function generateMenu(array $listBigTypes): array
    {
        return [
            [
                'url' => $this->router->generate('homepage', ['_fragment' => '']),
                'title' => $this->translator->trans('title.accueil'),
                'has-children' => false,
            ],
            [
                'url' => $this->router->generate('curriculum', ['_fragment' => '']),
                'title' => $this->translator->trans('title.curriculum'),
                'hasChildren' => false,
            ],
            [
                'url' => '#technologies',
                'title' => $this->translator->trans('title.technologies'),
                'hasChildren' => true,
                'subTechnologieNavbar' => [
                    [
                        'url' => $this->router->generate('technologies', ['_fragment' => 'languages']),
                        'svg' => '<svg aria-hidden="true" focusable="false" data-prefix="fad" data-icon="laptop" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" class="svg-inline--fa fa-laptop fa-w-20 fa-2-5x"><g class="fa-group"><path fill="currentColor" d="M528 0H112a48.14 48.14 0 0 0-48 48v336h512V48a48.14 48.14 0 0 0-48-48zm-16 320H128V64h384z" class="fa-secondary"></path><path fill="currentColor" d="M624 416H381.54c-.74 19.81-14.71 32-32.74 32H288c-18.69 0-33-17.47-32.77-32H16a16 16 0 0 0-16 16v16a64.19 64.19 0 0 0 64 64h512a64.19 64.19 0 0 0 64-64v-16a16 16 0 0 0-16-16zM512 64H128v256h384zM289 250.34l-11.31 11.31a16 16 0 0 1-22.63 0l-58.35-58.34a16 16 0 0 1 0-22.63L255 122.34a16 16 0 0 1 22.63 0L289 133.65a16 16 0 0 1 0 22.63L253.25 192 289 227.71a16 16 0 0 1 0 22.63zm154.35-47L385 261.66a16 16 0 0 1-22.63 0L351 250.35a16 16 0 0 1 0-22.63L386.75 192 351 156.29a16 16 0 0 1 0-22.63l11.31-11.31a16 16 0 0 1 22.63 0l58.34 58.34a16 16 0 0 1 .04 22.63z" class="fa-primary"></path></g></svg>',
                        'title' => $this->translator->trans('title.languages.de.developpements'),
                        'imgs' => [
                            ['src' => '/imgs/php.png'],
                            ['src' => '/imgs/symfony.png'],
                            ['src' => '/imgs/html-css-js.gif'],
                            ['src' => '/imgs/mysql.png'],
                            ['src' => '/imgs/java.png'],
                            ['src' => '/imgs/flutter.png'],
                            ['src' => '/imgs/dot-net.png', 'class' => 'more-padding'],
                        ],
                    ],
                    [
                        'url' => $this->router->generate('technologies', ['_fragment' => 'environnements']),
                        'svg' => '<svg aria-hidden="true" focusable="false" data-prefix="fad" data-icon="cubes" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-cubes fa-w-20 fa-3x"><g class="fa-group"><path fill="currentColor" d="M488.6 250.2L392 214V105.52a36 36 0 0 0-23.4-33.7l-100-37.5a35.68 35.68 0 0 0-25.3 0l-100 37.5a36 36 0 0 0-23.4 33.7V214l-96.6 36.2A36 36 0 0 0 0 283.9V394a36 36 0 0 0 19.9 32.2l100 50a35.86 35.86 0 0 0 32.2 0l103.9-52 103.9 52a35.86 35.86 0 0 0 32.2 0l100-50A36 36 0 0 0 512 394V283.9a36 36 0 0 0-23.4-33.7zM238 395.18l-85 42.5v-79.09l85-38.8zm0-112l-102 41.41L34 283.2v-.6l102-38.2 102 38.2zm-84-178.46v-.6l102-38.2 102 38.2v.6l-102 41.39zm119 73.79l85-37v73.29l-85 31.9zm205 216.67l-85 42.5v-79.09l85-38.8zm0-112l-102 41.41-102-41.39v-.6l102-38.2 102 38.2z" class="fa-secondary"></path><path fill="currentColor" d="M153 437.68l85-42.5v-75.39l-85 38.8zm240-79.09v79.09l85-42.5v-75.39zM273 246.7l85-31.9v-73.29l-85 37z" class="fa-primary"></path></g></svg>',
                        'title' => $this->translator->trans('title.environnements.systemes.expoitations'),
                        'imgs' => [
                            ['src' => '/imgs/windows.png', 'class' => 'more-padding'],
                            ['src' => '/imgs/linux.png'],
                            ['src' => '/imgs/android.png'],
                            ['src' => '/imgs/apple.png'],
                        ],
                    ],
                    [
                        'url' => $this->router->generate('technologies', ['_fragment' => 'softwares']),
                        'svg' => '<svg aria-hidden="true" focusable="false" data-prefix="fad" data-icon="laptop" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" class="svg-inline--fa fa-laptop fa-w-20 fa-2-5x ml-1"><g class="fa-group"><path fill="currentColor" d="M464 32H48A48 48 0 0 0 0 80v80h512V80a48 48 0 0 0-48-48zm-240 96a32 32 0 1 1 32-32 32 32 0 0 1-32 32zm96 0a32 32 0 1 1 32-32 32 32 0 0 1-32 32zm96 0a32 32 0 1 1 32-32 32 32 0 0 1-32 32z" class="fa-secondary"></path><path fill="currentColor" d="M320 128a32 32 0 1 0-32-32 32 32 0 0 0 32 32zm96 0a32 32 0 1 0-32-32 32 32 0 0 0 32 32zM0 160v272a48 48 0 0 0 48 48h416a48 48 0 0 0 48-48V160z" class="fa-primary"></path></g></svg>',
                        'title' => $this->translator->trans('title.tools.softwares'),
                        'imgs' => [
                            ['src' => '/imgs/intelliJ.gif', 'class' => 'no-padding'],
                            ['src' => '/imgs/androidStudio.png', 'class' => 'no-padding'],
                            ['src' => '/imgs/git.png'],
                            ['src' => '/imgs/adobe.gif', 'class' => 'no-padding'],
                        ],
                    ],
                ],
            ],
            [
                'url' => '#realisations',
                'title' => $this->translator->trans('title.realisations'),
                'hasChildren' => true,
                'subCreationNavbar' => [
                    'url' => $this->router->generate('realisations'),
                    'title' => $this->translator->trans('btn.voir.toutes.les.realisations'),
                    'bigTypes' => $this->transformBigTypes($listBigTypes),
                ],
            ],
        ];
    }

    private function transformBigTypes(array $listBigTypes): array
    {
        $bigTypes = [];

        /** @var BigType $bigType */
        foreach ($listBigTypes as $bigType) {
            $bigTypes[] = [
                'url' => $this->router->generate('realisations', ['bigTypesToShow' => $bigType->getId()]),
                'svg' => $bigType->getSvg()->getSvgHtml(),
                'title' => $this->translator->trans($bigType->getTitleKey()),
                'count' => $this->translator->trans('text.x.realisation', ['%count%' => $bigType->getCreations()->count()]),
            ];
        }

        return $bigTypes;
    }
}