<?php
/**
 * Created by PhpStorm.
 * User: sdeparte
 * Date: 17/04/19
 * Time: 15:14
 */

namespace App\Tests;

//use Hautelook\AliceBundle\PhpUnit\RefreshDatabaseTrait;
use Symfony\Bridge\Doctrine\DataCollector\DoctrineDataCollector;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class ApiTest extends WebTestCase
{
    //use RefreshDatabaseTrait;

    public function testGetArticle()
    {
        $client = static::createClient();
        $client->enableProfiler();

        $client->request('GET', '/api/articles/21.json');

        $this->assertSame(200, $client->getResponse()->getStatusCode());
        $this->assertContains("symfony c'est cool", $client->getResponse()->getContent());

        /** @var DoctrineDataCollector $collector */
        $collector = $client->getProfile()->getCollector('db');

        $this->assertSame(1, $collector->getQueryCount());
    }
}