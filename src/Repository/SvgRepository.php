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

    // /**
    //  * @return Svg[] Returns an array of Svg objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('s')
            ->andWhere('s.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('s.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Svg
    {
        return $this->createQueryBuilder('s')
            ->andWhere('s.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
