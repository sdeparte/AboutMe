<?php

namespace App\Repository;

use App\Entity\BigType;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method BigType|null find($id, $lockMode = null, $lockVersion = null)
 * @method BigType|null findOneBy(array $criteria, array $orderBy = null)
 * @method BigType[]    findAll()
 * @method BigType[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class BigTypeRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, BigType::class);
    }
}
