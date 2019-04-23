<?php
/**
 * Created by PhpStorm.
 * User: sdeparte
 * Date: 17/04/19
 * Time: 15:14
 */

namespace App\Tests;

use Symfony\Bridge\Doctrine\DataCollector\DoctrineDataCollector;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class ArticleTest extends WebTestCase
{
    public function testAffichageArticles()
    {
        $client = static::createClient();
        $client->enableProfiler();

        $crawler = $client->request('GET', '/fr/articles');
        $articles = $crawler->filter('html > body > ul > li');

        $this->assertSame(200, $client->getResponse()->getStatusCode());
        $this->assertCount(5, $articles);
        $this->assertContains("symfony c'est cool", $crawler->text());

        /** @var DoctrineDataCollector $collector */
        $collector = $client->getProfile()->getCollector('db');

        $this->assertSame(1, $collector->getQueryCount());
    }
}