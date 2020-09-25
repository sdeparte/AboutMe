<?php

namespace App\Repository;

use App\Entity\Svg;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method Svg|null find($id, $lockMode = null, $lockVersion = null)
 * @method Svg|null findOneBy(array $criteria, array $orderBy = null)
 * @method Svg[]    findAll()
 * @method Svg[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class SvgRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, Svg::class);
    }
}
