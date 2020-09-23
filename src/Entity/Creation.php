<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\CreationRepository")
 */
class Creation
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $titleKey;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $subTitleKey;

    /**
     * @ORM\Column(type="text")
     */
    private $descriptionKey;

    /**
     * @ORM\Column(type="string", length=7)
     */
    private $backgroundColor;

    /**
     * @ORM\Column(type="string", length=7)
     */
    private $color;

    /**
     * @ORM\Column(type="string", length=7)
     */
    private $hoverColor;

    /**
     * @ORM\Column(type="string", length=127)
     */
    private $typeKey;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Image", mappedBy="creation")
     */
    private $images;

    /**
     * @ORM\ManyToMany(targetEntity="App\Entity\Tag", inversedBy="creations")
     */
    private $tags;

    /**
     * @ORM\ManyToMany(targetEntity="App\Entity\Technology", inversedBy="creations")
     */
    private $technologies;

    /**
     * @ORM\OneToOne(targetEntity="App\Entity\Vignette", inversedBy="creation", cascade={"persist", "remove"})
     * @ORM\JoinColumn(nullable=false)
     */
    private $vignette;

    public function __construct()
    {
        $this->images = new ArrayCollection();
        $this->tags = new ArrayCollection();
        $this->technologies = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitleKey(): ?string
    {
        return $this->titleKey;
    }

    public function setTitleKey(string $titleKey): self
    {
        $this->titleKey = $titleKey;

        return $this;
    }

    public function getSubTitleKey(): ?string
    {
        return $this->subTitleKey;
    }

    public function setSubTitleKey(string $subTitleKey): self
    {
        $this->subTitleKey = $subTitleKey;

        return $this;
    }

    public function getDescriptionKey(): ?string
    {
        return $this->descriptionKey;
    }

    public function setDescriptionKey(string $descriptionKey): self
    {
        $this->descriptionKey = $descriptionKey;

        return $this;
    }

    public function getBackgroundColor(): ?string
    {
        return $this->backgroundColor;
    }

    public function setBackgroundColor(string $backgroundColor): self
    {
        $this->backgroundColor = $backgroundColor;

        return $this;
    }

    public function getColor(): ?string
    {
        return $this->color;
    }

    public function setColor(string $color): self
    {
        $this->color = $color;

        return $this;
    }

    public function getHoverColor(): ?string
    {
        return $this->hoverColor;
    }

    public function setHoverColor(string $hoverColor): self
    {
        $this->hoverColor = $hoverColor;

        return $this;
    }

    public function getTypeKey(): ?string
    {
        return $this->typeKey;
    }

    public function setTypeKey(string $typeKey): self
    {
        $this->typeKey = $typeKey;

        return $this;
    }

    /**
     * @return Collection|Image[]
     */
    public function getImages(): Collection
    {
        return $this->images;
    }

    public function addImage(Image $image): self
    {
        if (!$this->images->contains($image)) {
            $this->images[] = $image;
            $image->setCreation($this);
        }

        return $this;
    }

    public function removeImage(Image $image): self
    {
        if ($this->images->contains($image)) {
            $this->images->removeElement($image);
            // set the owning side to null (unless already changed)
            if ($image->getCreation() === $this) {
                $image->setCreation(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Tag[]
     */
    public function getTags(): Collection
    {
        return $this->tags;
    }

    public function addTag(Tag $tag): self
    {
        if (!$this->tags->contains($tag)) {
            $this->tags[] = $tag;
        }

        return $this;
    }

    public function removeTag(Tag $tag): self
    {
        if ($this->tags->contains($tag)) {
            $this->tags->removeElement($tag);
        }

        return $this;
    }

    /**
     * @return Collection|Technology[]
     */
    public function getTechnologies(): Collection
    {
        return $this->technologies;
    }

    public function addTechnology(Technology $technology): self
    {
        if (!$this->technologies->contains($technology)) {
            $this->technologies[] = $technology;
        }

        return $this;
    }

    public function removeTechnology(Technology $technology): self
    {
        if ($this->technologies->contains($technology)) {
            $this->technologies->removeElement($technology);
        }

        return $this;
    }

    public function getVignette(): ?Vignette
    {
        return $this->vignette;
    }

    public function setVignette(Vignette $vignette): self
    {
        $this->vignette = $vignette;

        return $this;
    }
}