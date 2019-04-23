<?php
/**
 * Created by PhpStorm.
 * User: sdeparte
 * Date: 17/04/19
 * Time: 11:22
 */

namespace App\Manager;


use App\Repository\ArticleRepository;

class ArticleManager
{
    /**
     * @var ArticleRepository
     */
    private $articleRepository;

    /**
     * @var string
     */
    private $env;

    /**
     * ArticleManager constructor.
     *
     * @param ArticleRepository $articleRepository
     */
    public function __construct(ArticleRepository $articleRepository, string $env)
    {
        $this->articleRepository = $articleRepository;
        $this->env = $env;
    }

    /**
     * @return \App\Entity\Article[]
     */
    public function getLast10Articles(): array
    {
        return $this->articleRepository->findBy(array(), array("created_at" =>  "DESC"), 10);
    }

    /**
     * @return string
     */
    public function getEnv(): string
    {
        return $this->env;
    }
}