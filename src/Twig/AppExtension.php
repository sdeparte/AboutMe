<?php


namespace App\Twig;

use Symfony\Component\Asset\Packages;
use Symfony\Contracts\Translation\TranslatorInterface;
use Twig\Extension\AbstractExtension;
use Twig\TwigFilter;

class AppExtension extends AbstractExtension
{
    /**
     * @var Packages
     */
    private $packages;

    /**
     * @var TranslatorInterface
     */
    private $translator;

    /**
     * AppExtension constructor.
     *
     * @param Packages            $packages
     * @param TranslatorInterface $translator
     */
    public function __construct(Packages $packages, TranslatorInterface $translator)
    {
        $this->packages = $packages;
        $this->translator = $translator;
    }

    /**
     * @inheritDoc
     */
    public function getFilters()
    {
        return [
            new TwigFilter('parseHtml', [$this, 'parseHtml']),
        ];
    }

    /**
     * @param string $html
     *
     * @return string
     */
    public function parseHtml(string $html)
    {
        $html = preg_replace_callback(
            '/{{([^{}|]+)\|asset}}/',
            function ($matches) {
                return $this->packages->getUrl($matches[1], null);
            },
            $html
        );

        $html = preg_replace_callback(
            '/{{([^{}|]+)\|trans(\[([^\[\]]+)\])?}}/',
            function ($matches) {
                $params = [];

                if (count($matches) > 3) {
                    $splited = explode(';', $matches[3]);

                    foreach ($splited as $split) {
                        $subSlited = explode(':', $split);

                        if (2 === count($subSlited)) {
                            $params['%'.$subSlited[0].'%'] = $this->translator->trans($subSlited[1]);
                        }
                    }
                }

                return $this->translator->trans($matches[1], $params);
            },
            $html
        );

        return $html;
    }
}